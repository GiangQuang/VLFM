using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace VLFM.Core.Models
{
    public class PropertyImportDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(44)]
        public string PropImportID { get; set; } 
        [Required]
        [StringLength(14)]
        public string DtReceiptID { get; set; }
        [Required]
        [StringLength(14)]
        public string PropertyID { get; set; }
        [Required]
        public DateTime WarrantydayAt { get; set; }
        [Required]
        public DateTime WarrantydayEnd { get; set; }
        [DefaultValue(20240528205853)]
        [StringLength(14)]
        public string StatusID { get; set; }

        public PropertyImportDetails(string dtReceiptID, string propertyID)
        {
            DtReceiptID = dtReceiptID;
            PropertyID = propertyID;
            PropImportID = GeneratePropImportID(dtReceiptID, propertyID);
        }
        private string GeneratePropImportID(string DtReceiptID, string PropertyID)
        {
            return $"{DtReceiptID}-{PropertyID}-{DateTime.Now.ToString("yyyyMMddHHmmss")}";
        }
    }
}
