// TODO: search nama
// TODO: Benerin count
// TODO: tambah nrp

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

    height: "80%",
    width: "100%",
    filtering: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageSize: 20,
    pageIndex: 1,
    pageLoading: true,
    pageButtonCount: 3,
    pagerContainer: $("#pager"),
    controller: {
      loadData: function (filter) {
        const query = { ...filter };

        query.page = filter.pageIndex;
        query.count = filter.pageSize;

        delete query.pageIndex;
        delete query.pageSize;

        return $.get("http://localhost:3000/skor", query).then(({data, total}) => {
          const result = {
            data: data || [],
            // itemsCount: response.length || 0,
            itemsCount: total || 0,
          };

          return result;
        });
      },
    },

    fields: [
      { name: "nrp", title: "NRP", type: "text", width: 50 },
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
