$(function () {
  var mapel = [
    { nama: "", id: 0 },
    { nama: "Fisika", id: 1 },
    { nama: "Kimia", id: 2 },
    { nama: "Matematika", id: 3 },
    { nama: "Biologi", id: 4 },
    { nama: "Agama", id: 5 },
    { nama: "Bahasa Indonesia", id: 6 },
    { nama: "Bahasa Inggris", id: 7 },
  ];

  $("#jsGrid").jsGrid({
    height: "70%",
    width: "100%",
    filtering: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageSize: 10,
    pageButtonCount: 3,
    controller: {
      loadData: function (filter) {
        return $.ajax({
          type: "GET",
          url: "http://localhost:3000/skor",
          data: filter,
        });
      },
    },
    fields: [
      { name: "nama", title: "Nama Siswa", type: "text", width: 150 },
      {
        name: "id_mapel",
        title: "Mata Pelajaran",
        type: "select",
        items: mapel,
        align: "left",
        valueField: "id",
        textField: "nama",
        width: 20,
      },
      { name: "skor", title: "Skor", type: "text", width: 10 },
      // { type: "control" },
    ],
  });
});
