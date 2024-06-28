using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using VLFM.Core.Models;

namespace VLFM.Core.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetById(int id);
        Task<IEnumerable<T>> GetAll();
        Task<UserDetails> GetUserByUsername(string username); 
        Task<RoleDetails> GetRoleByRolename(string rolename);
        Task Add(T entity);
        void Delete(T entity);
        void Update(T entity);
    }
}
