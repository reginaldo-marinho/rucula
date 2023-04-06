﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Rucula.Infra.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("LanguageRuculaParameter", b =>
                {
                    b.Property<string>("Code")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Description")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<bool>("IsCSSClass")
                        .HasColumnType("boolean");

                    b.Property<string>("Representation")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Code")
                        .HasName("PrimaryKey_LanguageRuculaParameterCode");

                    b.ToTable("LanguageRuculaParameter");
                });

            modelBuilder.Entity("Rucula.Domain.AtributesHTML", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<bool>("IsAtributeClass")
                        .HasColumnType("boolean");

                    b.HasKey("Code")
                        .HasName("PrimaryKey_AtributesHTMLCode");

                    b.ToTable("AtributesHTML");
                });

            modelBuilder.Entity("Rucula.Domain.ContentEstruture", b =>
                {
                    b.Property<string>("Guuid")
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Next")
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<string>("Previous")
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.HasKey("Guuid")
                        .HasName("PrimaryKey_ContentEstrutureGuuid");

                    b.ToTable("ContentEstruture");
                });

            modelBuilder.Entity("Rucula.Domain.ContentHTML", b =>
                {
                    b.Property<string>("Guuid")
                        .HasMaxLength(36)
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(1300)
                        .HasColumnType("character varying(1300)");

                    b.Property<string>("ContentEstrutureForeignKey")
                        .HasColumnType("character varying(36)");

                    b.Property<string>("ContentLanguageRucula")
                        .IsRequired()
                        .HasMaxLength(3000)
                        .HasColumnType("character varying(3000)");

                    b.Property<DateTime>("DateCreation")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("DateLastUpdate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Guuid")
                        .HasName("PrimaryKey_ContentHTMLGuuid");

                    b.HasIndex("ContentEstrutureForeignKey")
                        .IsUnique();

                    b.ToTable("ContentHTML");
                });

            modelBuilder.Entity("Rucula.Domain.KeyWord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("LanguageId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Id")
                        .HasName("PrimaryKey_KeyWordId");

                    b.HasIndex("LanguageId");

                    b.ToTable("KeyWord");
                });

            modelBuilder.Entity("Rucula.Domain.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Id");

                    b.ToTable("Language");
                });

            modelBuilder.Entity("Rucula.Domain.LanguageRucula", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("AtributesDefaut")
                        .HasMaxLength(350)
                        .HasColumnType("character varying(350)");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<string>("Description2")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.HasKey("Code")
                        .HasName("PrimaryKey_LAnguageRuculaCode");

                    b.ToTable("LanguageRucula");
                });

            modelBuilder.Entity("Rucula.Domain.LanguageRuculaRepresentation", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("CodeRuculaForeKey")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Code")
                        .HasName("PrimaryKey_LanguageRuculaRepresentationCode");

                    b.HasIndex("CodeRuculaForeKey")
                        .IsUnique();

                    b.ToTable("LanguageRuculaRepresentation");
                });

            modelBuilder.Entity("Rucula.Domain.TagMetaHTML", b =>
                {
                    b.Property<string>("Guuid")
                        .HasColumnType("text");

                    b.Property<string>("Content")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<string>("ContentHTMLFk")
                        .HasColumnType("character varying(36)");

                    b.Property<string>("Description")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<string>("Propert")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Guuid")
                        .HasName("PrimaryKey_TagMetaHTMLGuuid");

                    b.HasIndex("ContentHTMLFk");

                    b.ToTable("TagMetaHTML");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Button", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("WindowFk")
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Color")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Icon")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<string>("Link")
                        .HasMaxLength(120)
                        .HasColumnType("character varying(120)");

                    b.Property<string>("Method")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Post")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Target")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<string>("Text")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Type")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Urlrelative")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Id", "WindowFk")
                        .HasName("PrimaryKey_Button_Id");

                    b.HasIndex("WindowFk");

                    b.ToTable("Button");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Columns", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("WindowFk")
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.HasKey("Id", "WindowFk")
                        .HasName("PrimaryKey_Columns_Id");

                    b.HasIndex("WindowFk");

                    b.ToTable("Columns");
                });

            modelBuilder.Entity("Rucula.Domain.Window.ColumnsGridGet", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("WindowFk")
                        .HasColumnType("character varying(10)");

                    b.Property<string>("ParameterGrid")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<string>("ParameterUrl")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.HasKey("Id", "WindowFk")
                        .HasName("PrimaryKey_ColumnsGridGet_Id_Window");

                    b.HasIndex("WindowFk");

                    b.ToTable("ColumnsGridGet");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Field", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<bool>("Disable")
                        .HasColumnType("boolean");

                    b.Property<string>("FrameFk")
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Information")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<short>("Max")
                        .HasColumnType("smallint");

                    b.Property<short>("MaxLength")
                        .HasColumnType("smallint");

                    b.Property<short>("Min")
                        .HasColumnType("smallint");

                    b.Property<string>("PropertDto")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<bool>("Requerid")
                        .HasColumnType("boolean");

                    b.Property<short>("Sequence")
                        .HasColumnType("smallint");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.HasKey("Id")
                        .HasName("PrimaryKey_Field_Id");

                    b.HasIndex("FrameFk");

                    b.ToTable("Field");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Frame", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("ObjectDto")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<short>("Sequence")
                        .HasColumnType("smallint");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("WindowFk")
                        .HasColumnType("character varying(10)");

                    b.HasKey("Id")
                        .HasName("PrimaryKey_Frame_Id");

                    b.HasIndex("WindowFk");

                    b.ToTable("Frame");
                });

            modelBuilder.Entity("Rucula.Domain.Window.JoinChield", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("WindowFk")
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Key")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Id", "WindowFk")
                        .HasName("PrimaryKey_JoinChield_Id");

                    b.HasIndex("WindowFk");

                    b.ToTable("JoinChield");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Window", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("URLGetAll")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("URLGetId")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("URLRoot")
                        .HasMaxLength(60)
                        .HasColumnType("character varying(60)");

                    b.HasKey("Id")
                        .HasName("PrimaryKey_Window_Id");

                    b.ToTable("Window");
                });

            modelBuilder.Entity("Rucula.Domain.ContentHTML", b =>
                {
                    b.HasOne("Rucula.Domain.ContentEstruture", "ContentEstruture")
                        .WithOne("ContentHTMLFk")
                        .HasForeignKey("Rucula.Domain.ContentHTML", "ContentEstrutureForeignKey");

                    b.Navigation("ContentEstruture");
                });

            modelBuilder.Entity("Rucula.Domain.KeyWord", b =>
                {
                    b.HasOne("Rucula.Domain.Language", "Language")
                        .WithMany("KeyWords")
                        .HasForeignKey("LanguageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Language");
                });

            modelBuilder.Entity("Rucula.Domain.LanguageRuculaRepresentation", b =>
                {
                    b.HasOne("Rucula.Domain.LanguageRucula", "LanguageRucula")
                        .WithOne("LanguageRuculaRepresentation")
                        .HasForeignKey("Rucula.Domain.LanguageRuculaRepresentation", "CodeRuculaForeKey")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LanguageRucula");
                });

            modelBuilder.Entity("Rucula.Domain.TagMetaHTML", b =>
                {
                    b.HasOne("Rucula.Domain.ContentHTML", "ContentHTML")
                        .WithMany("TagMetaHTML")
                        .HasForeignKey("ContentHTMLFk");

                    b.Navigation("ContentHTML");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Button", b =>
                {
                    b.HasOne("Rucula.Domain.Window.Window", "Window")
                        .WithMany("Button")
                        .HasForeignKey("WindowFk")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("ForeignKey_Buttons_Window");

                    b.Navigation("Window");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Columns", b =>
                {
                    b.HasOne("Rucula.Domain.Window.Window", "Window")
                        .WithMany("Columns")
                        .HasForeignKey("WindowFk")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("ForeignKey_Collums_Window");

                    b.Navigation("Window");
                });

            modelBuilder.Entity("Rucula.Domain.Window.ColumnsGridGet", b =>
                {
                    b.HasOne("Rucula.Domain.Window.Window", "Window")
                        .WithMany("ColumnsGridGet")
                        .HasForeignKey("WindowFk")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("ForeignKey_ColumnsGridGet_Window");

                    b.Navigation("Window");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Field", b =>
                {
                    b.HasOne("Rucula.Domain.Window.Frame", "Frame")
                        .WithMany("Fields")
                        .HasForeignKey("FrameFk")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Frame");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Frame", b =>
                {
                    b.HasOne("Rucula.Domain.Window.Window", "Window")
                        .WithMany("Frames")
                        .HasForeignKey("WindowFk")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("Window");
                });

            modelBuilder.Entity("Rucula.Domain.Window.JoinChield", b =>
                {
                    b.HasOne("Rucula.Domain.Window.Window", "Window")
                        .WithMany("JoinChield")
                        .HasForeignKey("WindowFk")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("ForeignKey_JoinChield_Window");

                    b.Navigation("Window");
                });

            modelBuilder.Entity("Rucula.Domain.ContentEstruture", b =>
                {
                    b.Navigation("ContentHTMLFk");
                });

            modelBuilder.Entity("Rucula.Domain.ContentHTML", b =>
                {
                    b.Navigation("TagMetaHTML");
                });

            modelBuilder.Entity("Rucula.Domain.Language", b =>
                {
                    b.Navigation("KeyWords");
                });

            modelBuilder.Entity("Rucula.Domain.LanguageRucula", b =>
                {
                    b.Navigation("LanguageRuculaRepresentation");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Frame", b =>
                {
                    b.Navigation("Fields");
                });

            modelBuilder.Entity("Rucula.Domain.Window.Window", b =>
                {
                    b.Navigation("Button");

                    b.Navigation("Columns");

                    b.Navigation("ColumnsGridGet");

                    b.Navigation("Frames");

                    b.Navigation("JoinChield");
                });
#pragma warning restore 612, 618
        }
    }
}
