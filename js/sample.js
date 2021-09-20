// DONE: search nama
// DONE: tambah nrp
// TODO: Benerin count
// TODO: alert when choosing nrp and kota

$(function () {
  const mapel = [
    { nama: "", id: null },
    { nama: "Fisika", id: 1 },
    { nama: "Kimia", id: 2 },
    { nama: "Matematika", id: 3 },
    { nama: "Biologi", id: 4 },
    { nama: "Agama", id: 5 },
    { nama: "Bahasa Indonesia", id: 6 },
    { nama: "Bahasa Inggris", id: 7 },
  ];

  const kota = [
    { id: null, nama: "" },
    { id: 1, nama: "Kabupaten Bangkalan" },
    { id: 2, nama: "Kabupaten Banyuwangi" },
    { id: 3, nama: "Kabupaten Blitar" },
    { id: 4, nama: "Kabupaten Bojonegoro" },
    { id: 5, nama: "Kabupaten Bondowoso" },
    { id: 6, nama: "Kabupaten Gresik" },
    { id: 7, nama: "Kabupaten Jember" },
    { id: 8, nama: "Kabupaten Jombang" },
    { id: 9, nama: "Kabupaten Kediri" },
    { id: 10, nama: "Kabupaten Lamongan" },
    { id: 11, nama: "Kabupaten Lumajang" },
    { id: 12, nama: "Kabupaten Madiun" },
    { id: 13, nama: "Kabupaten Magetan" },
    { id: 14, nama: "Kabupaten Malang" },
    { id: 15, nama: "Kabupaten Mojokerto" },
    { id: 16, nama: "Kabupaten Nganjuk" },
    { id: 17, nama: "Kabupaten Ngawi" },
    { id: 18, nama: "Kabupaten Pacitan" },
    { id: 19, nama: "Kabupaten Pamekasan" },
    { id: 20, nama: "Kabupaten Pasuruan" },
    { id: 21, nama: "Kabupaten Ponorogo" },
    { id: 22, nama: "Kabupaten Probolinggo" },
    { id: 23, nama: "Kabupaten Sampang" },
    { id: 24, nama: "Kabupaten Sidoarjo" },
    { id: 25, nama: "Kabupaten Situbondo" },
    { id: 26, nama: "Kabupaten Sumenep" },
    { id: 27, nama: "Kabupaten Trenggalek" },
    { id: 28, nama: "Kabupaten Tuban" },
    { id: 29, nama: "Kabupaten Tulungagung" },
    { id: 30, nama: "Kota Batu" },
    { id: 31, nama: "Kota Blitar" },
    { id: 32, nama: "Kota Kediri" },
    { id: 33, nama: "Kota Madiun" },
    { id: 34, nama: "Kota Malang" },
    { id: 35, nama: "Kota Mojokerto" },
    { id: 36, nama: "Kota Pasuruan" },
    { id: 37, nama: "Kota Probolinggo" },
    { id: 38, nama: "Kota Surabaya" },
  ];

  function appendKota(data) {
    return data.map((item) => {
      const id_kota = Number(item.nrp.slice(0, 2));
      // console.log(item)
      // item.kota = kota[id_kota].nama
      item.id_kota = id_kota;
      return item;
    });
  }

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

        return $.get("http://localhost:3000/skor", query).then(
          ({ data, total }) => {
            // console.log(appendKota(data))
            // console.log(data)

            const result = {
              data: appendKota(data) || [],
              // data: data || [],
              // itemsCount: response.length || 0,
              itemsCount: total || 0,
            };

            return result;
          }
        );
      },
    },

    fields: [
      { name: "nrp", css: "nrp_field", title: "NRP", type: "text", width: 50 },
      { name: "nama", title: "Nama Siswa", type: "text", width: 150 },
      {
        name: "id_kota",
        title: "Kota",
        type: "select",
        css: "kota_field",
        items: kota,
        align: "left",
        valueField: "id",
        textField: "nama",
        width: 20,
      },
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

  // let lock = false
  function alertSingleField() {
    alert("Hanya bisa memilih salah satu filter (NRP atau Kota)");
  }

  $(".nrp_field > input").bind("change keyup", () => {
    // console.log($(".nrp_field > input").val())
    //TODO: change selected on nrp type
     $(".kota_field > select").val()
    const val = $(".nrp_field > input").val()
    if(val){
      // $(".kota_field > select").prop("disabled", true);

    }
  });

  // $(".kota_field > select").bind("change", () => {
  $(".kota_field > select").bind("click", () => {
    $(".nrp_field > input").val("")
    // console.log($(".kota_field > select").val(0));
    // $("#grid").jsGrid("reset");
  });
});
