using WindyApplication.Enum;

namespace WindyApplication.Models
{
    public class ResponseDto
    {
        public dynamic Data { get; set; }

        public ApiResponseCode Code { get; set; }

        public List<string> Errors { get; set; } = new List<string>();
    }
}
