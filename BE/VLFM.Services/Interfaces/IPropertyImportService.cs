using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Models;
using VLFM.Core.Response;

namespace VLFM.Services.Interfaces
{
    public interface IPropertyImportService
    {
        Task<bool> CreatePropertyImport(PropertyImportDetails propertyImportDetails);
        Task<IEnumerable<PropertyImportResponse>> GetAllPropertyImport();
        Task<PropertyImportResponse> GetPropertyImportById(int Id);
        Task<bool> UpdatePropertyImport(PropertyImportDetails propertyImportDetails);
        Task<bool> DeletePropertyImport(List<PropertyImportResponse> propImports);
    }
}
