using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Interfaces;
using VLFM.Core.Models;
using VLFM.Core.Response;
using VLFM.Services.Interfaces;

namespace VLFM.Services
{
    public class PropertyImportService : IPropertyImportService
    {
        public IUnitOfWork _unitOfWork;
        public PropertyImportService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> CreatePropertyImport(PropertyImportDetails propertyImportDetails)
        {
            if ( propertyImportDetails != null)
            {
                await _unitOfWork.PropertyImports.Add(propertyImportDetails);
                var result = _unitOfWork.Save();
                if (result > 0)
                    return true;
                else
                    return false;
            }
            return false;
        }
        public async Task<bool> DeletePropertyImport(List<PropertyImportResponse> propImports)
        {
            if (propImports != null && propImports.Any())
            {
                foreach (var item in propImports)
                {

                    var propertyImportDetails = await _unitOfWork.PropertyImports.GetById(item.Id);
                    if (propertyImportDetails != null)
                    {
                        _unitOfWork.PropertyImports.Delete(propertyImportDetails);
                    }
                }
                var result = _unitOfWork.Save();
                if (result > 0)
                    return true;
                else
                    return false;
            }
            return false;
        }

        public async Task<IEnumerable<PropertyImportResponse>> GetAllPropertyImport()
        {
            try
            {
                var propertyImport = await _unitOfWork.PropertyImports.GetAll();
                var receiptdetailed = await _unitOfWork.ReceiptsDetailed.GetAll();
                var properties = await _unitOfWork.Properties.GetAll();
                var status = await _unitOfWork.Statuses.GetAll();

                var query = from propim in propertyImport
                            join drec in receiptdetailed on propim.DtReceiptID equals drec.DtReceiptID
                            join prop in properties on propim.PropertyID equals prop.PropertyID
                            join sta in status on propim.StatusID equals sta.StatusID
                            select new PropertyImportResponse
                            {
                                Id = propim.Id,
                                PropImportID = propim.PropImportID,
                                DtReceiptID = propim.DtReceiptID,
                                PropertyID = propim.PropertyID,
                                WarrantydayAt = propim.WarrantydayAt,
                                WarrantydayEnd = propim.WarrantydayEnd,
                                StatusID = propim.StatusID,
                            };
                return query.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<PropertyImportResponse> GetPropertyImportById(int Id)
        {
            if (Id > 0)
            {
                var propertyImports = await _unitOfWork.PropertyImports.GetById(Id);
                var receiptdetailed = await _unitOfWork.ReceiptsDetailed.GetAll();
                var properties = await _unitOfWork.Properties.GetAll();
                var statuses = await _unitOfWork.Statuses.GetAll();

                if (propertyImports != null)
                {
                    try
                    {
                        var dtrececipt = receiptdetailed.FirstOrDefault(drec => drec.DtReceiptID == propertyImports.DtReceiptID);
                        var property = properties.FirstOrDefault(prop => prop.PropertyID == propertyImports.PropertyID);
                        var status = statuses.FirstOrDefault(sta => sta.StatusID == propertyImports.StatusID);
                        var response = new PropertyImportResponse
                        {
                            Id = propertyImports.Id,
                            PropImportID = propertyImports.PropImportID,
                            DtReceiptID = propertyImports.DtReceiptID,
                            PropertyID = propertyImports.PropertyID,
                            WarrantydayAt = propertyImports.WarrantydayAt,
                            WarrantydayEnd = propertyImports.WarrantydayEnd,
                            StatusID = propertyImports.StatusID,
                        };

                        return response;
                    }
                    catch (Exception ex)
                    {
                        return null;
                    }
                }
            }
            return null;
        }

        public async Task<bool> UpdatePropertyImport(PropertyImportDetails propertyImportDetails)
        {
            if (propertyImportDetails != null)
            {
                var propertyImport = await _unitOfWork.PropertyImports.GetById(propertyImportDetails.Id);
                if (propertyImport != null)
                {
                    propertyImport.DtReceiptID = propertyImportDetails.DtReceiptID;
                    propertyImport.PropertyID = propertyImportDetails.PropertyID;
                    propertyImport.WarrantydayAt = propertyImportDetails.WarrantydayAt;
                    propertyImport.WarrantydayEnd = propertyImportDetails.WarrantydayEnd;
                    propertyImport.StatusID = propertyImportDetails.StatusID;
                    _unitOfWork.PropertyImports.Update(propertyImport);
                    var result = _unitOfWork.Save();

                    if (result > 0)
                        return true;
                    else
                        return false;
                }
            }
            return false;
        }
       
    }
}
