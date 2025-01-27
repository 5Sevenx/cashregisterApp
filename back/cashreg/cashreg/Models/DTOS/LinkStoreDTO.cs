namespace cashreg.Models.DTOS
{
    public class LinkStoreDTO
    {
        public  List<IdsAmount> ID_Product { get; set; }
        public int ID_Store { get; set; }
    }

    public class IdsAmount
    {
        public  int ID_Product { get; set; }
    }
    public class LinkDTO2
    {
        public int ID_Product { get; set; }
        public int ID_Store { get; set; }
    }
}
