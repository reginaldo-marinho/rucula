using Rucula.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ContentHTMLConfiguration : IEntityTypeConfiguration<ContentHTML>
{
    public void Configure(EntityTypeBuilder<ContentHTML> builder)
    {
         builder.Property(p => p.Guuid)
            .IsRequired()
            .HasMaxLength(36);
        builder
            .HasKey(k => k.Guuid)
            .HasName("PrimaryKey_ContentHTMLGuuid");        
        builder
            .Property( p => p.Content)
            .IsRequired()
            .HasMaxLength(1300);
        builder
            .Property( p => p.DateCreation)
            .IsRequired();

    }
}