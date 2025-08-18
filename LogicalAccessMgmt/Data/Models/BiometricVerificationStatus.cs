namespace LogicalAccessMgmt.Data.Models { 
    public class BiometricVerificationStatus { 
        public string CIFNo { get; set; } = ""; 
        public int NIDVerificationStatus { get; set; } // 0 or 1
        public int FingerVerificationStatus { get; set; }  //0 or 1 
        public int FaceVerificationStatus { get; set; } // 0 or 1
    }