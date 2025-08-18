namespace LogicalAccessMgmt.Data.Models { 
    public class BiometricVerificationStatus { 
        public string CIFNo { get; set; } = ""; 
        public bool NIDVerificationStatus { get; set; } // 0 or 1
        public bool FingerVerificationStatus { get; set; }  //0 or 1 
        public bool FaceVerificationStatus { get; set; } // 0 or 1
    }