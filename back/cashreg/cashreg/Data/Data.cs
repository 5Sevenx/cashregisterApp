using Microsoft.EntityFrameworkCore;
using cashreg.Models;

namespace cashreg.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //+++++++++++++++++++++++++++++++++++++++++++++++++++TABLES+++++++++++++++++++++++++++++++++++++++++++++++++++
        public DbSet<Product> Products { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<TotalProductLink> TotalProductLinks { get; set; }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // +++++++++++++++++++++Defining the many-to-many relationship+++++++++++++++++++++
            //for TotalProductLink
            modelBuilder.Entity<TotalProductLink>()
            .HasKey(tpl => new { tpl.Product_ID, tpl.Total_Id });
            //for ticket
            modelBuilder.Entity<Ticket>()
           .HasKey(t => t.ID);
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            modelBuilder.Entity<TotalProductLink>()
            .HasOne(tpl => tpl.Product)
            .WithMany(p => p.TotalProductLinks)
            .HasForeignKey(tpl => tpl.Product_ID);

            modelBuilder.Entity<TotalProductLink>()
                .HasOne(tpl => tpl.Ticket)
                .WithMany(t => t.TotalProductLinks)
                .HasForeignKey(tpl => tpl.Total_Id);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Store)
                .WithMany(s => s.Tickets)
                .HasForeignKey(t => t.ID_Store);

        }
    }
}
