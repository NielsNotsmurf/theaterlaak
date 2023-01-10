using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace theaterlaak.Migrations
{
    public partial class secondmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stoelen_Reserveringen_ReserveringId",
                table: "Stoelen");

            migrationBuilder.AlterColumn<int>(
                name: "ReserveringId",
                table: "Stoelen",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Stoelen_Reserveringen_ReserveringId",
                table: "Stoelen",
                column: "ReserveringId",
                principalTable: "Reserveringen",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stoelen_Reserveringen_ReserveringId",
                table: "Stoelen");

            migrationBuilder.AlterColumn<int>(
                name: "ReserveringId",
                table: "Stoelen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Stoelen_Reserveringen_ReserveringId",
                table: "Stoelen",
                column: "ReserveringId",
                principalTable: "Reserveringen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
