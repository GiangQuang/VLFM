using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VLFM.Core.DTO
{
    public class PropertyImportDetailsDTO
    {
        public string DtReceiptID { get; set; }
        public string PropertyID { get; set; }
        public DateTime WarrantydayAt { get; set; }
        public DateTime WarrantydayEnd { get; set; }
        public int StatusID { get; set; }
    }
}
