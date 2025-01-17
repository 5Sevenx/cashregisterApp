using cashreg.Models.DTOS;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cashreg.Models
{
    [Table("LinkStore")]
    public class LinkStore
    {
        
        public int ID_Product { get;set; }
        public virtual Product Product { get; set; }
        
        public int ID_Store { get; set; }
        public virtual Store Store { get; set; }
        //public virtual  LinkStoreDTO LinkStoreDTO { get; set; }

    }
}
