using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace cashreg.Models
{
    [Table("Store")]
    public class Store
    {
        [Key]
        public int ID_Store { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Ticket> Tickets{ get; set; }
        public virtual ICollection<LinkStore> LinkStores{ get; set; }
    }
}
