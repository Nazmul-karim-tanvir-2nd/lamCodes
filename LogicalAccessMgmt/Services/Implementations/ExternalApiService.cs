using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using LogicalAccessMgmt.Data.Models;
using LogicalAccessMgmt.Services.interfaces;
using Newtonsoft.Json;

namespace LogicalAccessMgmt.Services.implementations
{
    public class ExternalApiService : IExternalApiService
    {
        private readonly Uri _loginBaseUri = new("http://devcrmapp-01/");
        private readonly string _contactApiBaseUrl = "http://devcrmapp-01/";
        private readonly CookieContainer _cookieContainer;
        private readonly HttpClient _loginClient;

        public ExternalApiService()
        {
            _cookieContainer = new CookieContainer();
            var handler = new HttpClientHandler
            {
                CookieContainer = _cookieContainer,
                UseCookies = true
            };

            _loginClient = new HttpClient(handler)
            {
                BaseAddress = _loginBaseUri
            };
        }

        public async Task<Dictionary<string, string>> LoginAndGetCookiesAsync()
        {
            var loginObj = new
            {
                UserName = "apiuser",
                UserPassword = "apiuser"
            };

            var content = new StringContent(JsonConvert.SerializeObject(loginObj), Encoding.UTF8, "application/json");
            var response = await _loginClient.PostAsync("ServiceModel/AuthService.svc/Login", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Login failed with status code {response.StatusCode}: {errorContent}");
            }

            var cookies = _cookieContainer.GetCookies(_loginBaseUri);
            return cookies.Cast<Cookie>().ToDictionary(c => c.Name, c => c.Value);
        }

        public async Task<ExtApiResponse> GetEmployeeInfoAsync(string cifOrNid, Dictionary<string, string> cookies)
        {
            var handler = new HttpClientHandler { UseCookies = false };
            using var client = new HttpClient(handler);

            var cookieHeader = string.Join("; ", cookies.Select(kvp => $"{kvp.Key}={kvp.Value}"));
            client.DefaultRequestHeaders.Add("Cookie", cookieHeader);

            if (cookies.TryGetValue("BPMCSRF", out var csrfToken))
            {
                client.DefaultRequestHeaders.Add("BPMCSRF", csrfToken);
            }

            string queryParam = cifOrNid.Length > 9
                ? $"NID={WebUtility.UrlEncode(cifOrNid)}"
                : $"CIF={WebUtility.UrlEncode(cifOrNid)}";

            string requestUrl = $"{_contactApiBaseUrl}0/rest/IDLCContactGetApi/GetContactInfo?{queryParam}";

            var response = await client.GetAsync(requestUrl);
            if (!response.IsSuccessStatusCode)
            {
                var errorDetails = await response.Content.ReadAsStringAsync();
                return new ExtApiResponse { Data = $"{{\"Error\": \"{response.StatusCode} - {errorDetails}\"}}" };
            }

            var jsonString = await response.Content.ReadAsStringAsync();

            var extApiResponse = JsonConvert.DeserializeObject<ExtApiResponse>(jsonString);

            return extApiResponse ?? new ExtApiResponse { Data = string.Empty };
        }

        public async Task<EmployeeInfo?> GetEmployeeInfoByCIFAsync(string cif)
        {
            var cookies = await LoginAndGetCookiesAsync();
            var apiResponse = await GetEmployeeInfoAsync(cif, cookies);
            return apiResponse.GetEmployees()?.FirstOrDefault();
        }

    }
}
