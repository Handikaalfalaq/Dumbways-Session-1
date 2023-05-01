package main

import (
	"fmt"
	"html/template"
	"net/http"
	"personal-web/connection"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type Blog struct {
	Id                int
	Title             string
	Content           string
	Image             string
	PostDate          string
	AuthorId          int
	StartInput        string
	EndInput          string
	StartDate         string
	EndDate           string
	Year              string
	DurationMonth     string
	DurationDay       string
	Nodejs            string
	Nextjs            string
	Reactjs           string
	Typescript        string
	NodejsChecked     string
	NextjsChecked     string
	ReactjsChecked    string
	TypescriptChecked string
}

var dataBlog = []Blog{
	{
		Title:         "APP",
		Content:       "App atau singkatan dari aplikasi adalah sebuah program komputer yang dirancang untuk melakukan tugas tertentu atau menyediakan layanan tertentu. Aplikasi dapat diinstal dan dijalankan pada perangkat komputer seperti smartphone, tablet, komputer desktop, atau perangkat lainnya.",
		StartInput:    "2020-04-14",
		EndInput:      "2020-04-30",
		StartDate:     "14 apr 2020",
		EndDate:       "30 apr 2020",
		Year:          "2020",
		DurationMonth: "1",
		DurationDay:   "12",
		Image:         "/assets/img/app.jpg",
		Nodejs:        "nodejsInput",
		Nextjs:        "nextjsInput",
		Reactjs:       "reactjsInput",
		// Typescript:    "",
		NodejsChecked:     "checked",
		NextjsChecked:     "checked",
		ReactjsChecked:    "checked",
		TypescriptChecked: "",
	},
	{
		Title:         "UI UX Designer",
		Content:       "UI berkaitan dengan tampilan visual atau antarmuka pengguna dari produk digital, seperti warna, font, layout, dan elemen desain lainnya. UX berkaitan dengan pengalaman pengguna saat menggunakan produk digital",
		StartInput:    "2020-04-15",
		EndInput:      "2020-04-30",
		StartDate:     "15 apr 2020",
		EndDate:       "30 apr 2020",
		Year:          "2021",
		DurationMonth: "2",
		DurationDay:   "15",
		Image:         "/assets/img/uiux.jpg",
		Nodejs:        "nodejsInput",
		Nextjs:        "nextjsInput",
		// Reactjs:       "",
		Typescript:        "typescriptInput",
		NodejsChecked:     "checked",
		NextjsChecked:     "checked",
		ReactjsChecked:    "",
		TypescriptChecked: "checked",
	},
	{
		Title:         "CODE",
		Content:       "Dalam pemrograman, code adalah sekumpulan instruksi atau perintah yang ditulis dalam bahasa pemrograman tertentu untuk memberikan komputer atau mesin lainnya instruksi tentang tindakan apa yang harus dilakukan. Kode biasanya ditulis oleh seorang programmer atau pengembang perangkat lunak dan dapat berupa kumpulan baris kode yang diorganisir dalam file atau program yang lebih besar.",
		StartInput:    "2020-04-16",
		EndInput:      "2020-04-30",
		StartDate:     "16 apr 2020",
		EndDate:       "30 apr 2020",
		Year:          "2022",
		DurationMonth: "3",
		DurationDay:   "21",
		Image:         "/assets/img/code.jpg",
		// Nodejs:        "",
		Nextjs:            "nextjsInput",
		Reactjs:           "reactjsInput",
		Typescript:        "typescriptInput",
		NodejsChecked:     "",
		NextjsChecked:     "checked",
		ReactjsChecked:    "checked",
		TypescriptChecked: "checked",
	},
	{
		Title:         "Smartphone",
		Content:       "Smartphone adalah jenis ponsel cerdas atau telepon pintar yang dilengkapi dengan kemampuan yang lebih canggih daripada ponsel biasa. Smartphone umumnya dilengkapi dengan fitur seperti layar sentuh, kamera, pengaturan jaringan seluler, pemutar musik, dan akses ke internet.",
		StartInput:    "2020-04-17",
		EndInput:      "2020-04-30",
		StartDate:     "17 apr 2020",
		EndDate:       "30 apr 2020",
		Year:          "2023",
		DurationMonth: "4",
		DurationDay:   "11",
		Image:         "/assets/img/smartphone.jpg",
		Nodejs:        "nodejsInput",
		// Nextjs:        "",
		Reactjs:           "reactjsInput",
		Typescript:        "typescriptInput",
		NodejsChecked:     "checked",
		NextjsChecked:     "",
		ReactjsChecked:    "checked",
		TypescriptChecked: "checked",
	},
}

func main() {

	connection.DatabaseConnect()
	// create new echo
	e := echo.New()

	// serve static files from public directory / css
	e.Static("/assets", "assets")

	// routing
	e.GET("/", home)
	e.GET("/blog", blog)
	e.GET("/contact-me", contactMe)
	e.GET("/blog-detail/:id", blogDetail)
	e.POST("/add-blog", addBlog)
	e.GET("/delete-blog/:id", deleteBlog)
	e.GET("/edit-blog/:id", editBlog)
	e.POST("/edit-blog/:id", editBlogFinished)

	e.Logger.Fatal(e.Start("localhost:5000"))
}

func home(c echo.Context) error {
	tmpl, err := template.ParseFiles("views/index.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	dataBlog := map[string]interface{}{
		"blogHome": dataBlog,
	}
	return tmpl.Execute(c.Response(), dataBlog)
}

func blog(c echo.Context) error {
	tmpl, err := template.ParseFiles("views/blog.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}
	return tmpl.Execute(c.Response(), nil)
}

func contactMe(c echo.Context) error {
	tmpl, err := template.ParseFiles("views/contact-me.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}
	return tmpl.Execute(c.Response(), nil)
}

func blogDetail(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	tmpl, err := template.ParseFiles("views/blog-detail.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	var blogData = Blog{}

	for i, data := range dataBlog {
		if id == i {
			blogData = Blog{
				Title:         data.Title,
				Content:       data.Content,
				StartDate:     data.StartDate,
				EndDate:       data.EndDate,
				Year:          data.Year,
				DurationMonth: data.DurationMonth,
				DurationDay:   data.DurationDay,
				Image:         data.Image,
				Nodejs:        data.Nodejs,
				Nextjs:        data.Nextjs,
				Reactjs:       data.Reactjs,
				Typescript:    data.Typescript,
			}
		}
	}
	data := map[string]interface{}{
		"dataDetail": blogData,
	}

	fmt.Println(data)
	fmt.Println("catatan: ini adalah data yg sudah klik blog dari database")
	return tmpl.Execute(c.Response(), data)
}

func addBlog(c echo.Context) error {
	startInput := c.FormValue("startInput")
	endInput := c.FormValue("endInput")

	// string to data tipe time.time dengan format 2006-01-02
	date1, _ := time.Parse("2006-01-02", startInput)
	date2, _ := time.Parse("2006-01-02", endInput)

	// value tahun, difference date
	year := date1.Year()
	month := int(date2.Sub(date1).Hours() / 24 / 30)
	day := int(date2.Sub(date1).Hours()/24) - (month * 30)

	// data tipe time.time to string
	dayString := strconv.Itoa(day)
	monthString := strconv.Itoa(month)
	yearString := strconv.Itoa(year)

	// data tipe time.time to string format 02 Januari 2006
	newdate1 := date1.Format("02 jan 2006")
	newdate2 := date2.Format("02 jan 2006")

	//  checked chexbox
	var nodejsChecked string
	var nextjsChecked string
	var reactjsChecked string
	var typescriptChecked string
	if c.FormValue("nodejsInput") == "nodejsInput" {
		nodejsChecked = "checked"
	}
	if c.FormValue("nodejsInput") == "nextjsInput" {
		nextjsChecked = "checked"
	}
	if c.FormValue("nodejsInput") == "reactjsInput" {
		reactjsChecked = "checked"
	}
	if c.FormValue("nodejsInput") == "typescriptInput" {
		typescriptChecked = "checked"
	}

	var addBlog = Blog{
		Title:         c.FormValue("titleInput"),
		Content:       c.FormValue("descriptionInput"),
		StartInput:    startInput,
		EndInput:      endInput,
		StartDate:     newdate1,
		EndDate:       newdate2,
		Year:          yearString,
		DurationMonth: monthString,
		DurationDay:   dayString,
		// Image:
		Nodejs:            c.FormValue("nodejsInput"),
		Nextjs:            c.FormValue("nextjsInput"),
		Reactjs:           c.FormValue("reactjsInput"),
		Typescript:        c.FormValue("typescriptInput"),
		NodejsChecked:     nodejsChecked,
		NextjsChecked:     nextjsChecked,
		ReactjsChecked:    reactjsChecked,
		TypescriptChecked: typescriptChecked,
	}

	dataBlog = append(dataBlog, addBlog)

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func deleteBlog(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	dataBlog = append(dataBlog[:id], dataBlog[id+1:]...)

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func editBlog(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	tmpl, err := template.ParseFiles("views/edit-blog.html")

	var editBlog = Blog{}

	for i, data := range dataBlog {
		if id == i {
			editBlog = Blog{
				Title:             data.Title,
				Content:           data.Content,
				StartInput:        data.StartInput,
				EndInput:          data.EndInput,
				Nodejs:            data.Nodejs,
				Nextjs:            data.Nextjs,
				Reactjs:           data.Reactjs,
				Typescript:        data.Typescript,
				NodejsChecked:     data.NodejsChecked,
				NextjsChecked:     data.NextjsChecked,
				ReactjsChecked:    data.ReactjsChecked,
				TypescriptChecked: data.TypescriptChecked,
			}
		}
	}

	data := map[string]interface{}{
		"blogEdit": editBlog,
	}

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"Message": err.Error()})
	}

	dataBlog = append(dataBlog[:id], dataBlog[id+1:]...)

	return tmpl.Execute(c.Response(), data)
}

func editBlogFinished(c echo.Context) error {

	startInput := c.FormValue("startInput")
	endInput := c.FormValue("endInput")

	// string to data tipe time.time dengan format 2006-01-02
	date1, _ := time.Parse("2006-01-02", startInput)
	date2, _ := time.Parse("2006-01-02", endInput)

	// value tahun, difference date
	year := date1.Year()
	month := int(date2.Sub(date1).Hours() / 24 / 30)
	day := int(date2.Sub(date1).Hours()/24) - (month * 30)

	// data tipe time.time to string
	dayString := strconv.Itoa(day)
	monthString := strconv.Itoa(month)
	yearString := strconv.Itoa(year)

	// data tipe time.time to string format 02 Januari 2006
	newdate1 := date1.Format("02 jan 2006")
	newdate2 := date2.Format("02 jan 2006")

	//  checked chexbox
	var nodejsChecked string
	var nextjsChecked string
	var reactjsChecked string
	var typescriptChecked string
	if c.FormValue("nodejsInput") == "nodejsInput" {
		nodejsChecked = "checked"
	}
	if c.FormValue("nodejsInput") == "nextjsInput" {
		nextjsChecked = "checked"
	}
	if c.FormValue("nodejsInput") == "reactjsInput" {
		reactjsChecked = "checked"
	}
	if c.FormValue("nodejsInput") == "typescriptInput" {
		typescriptChecked = "checked"
	}

	// id, _ := strconv.Atoi(c.Param("id"))

	var addBlog = Blog{
		Title:         c.FormValue("titleInput"),
		Content:       c.FormValue("descriptionInput"),
		StartInput:    startInput,
		EndInput:      endInput,
		StartDate:     newdate1,
		EndDate:       newdate2,
		Year:          yearString,
		DurationMonth: monthString,
		DurationDay:   dayString,
		// Image:
		Nodejs:            c.FormValue("nodejsInput"),
		Nextjs:            c.FormValue("nextjsInput"),
		Reactjs:           c.FormValue("reactjsInput"),
		Typescript:        c.FormValue("typescriptInput"),
		NodejsChecked:     nodejsChecked,
		NextjsChecked:     nextjsChecked,
		ReactjsChecked:    reactjsChecked,
		TypescriptChecked: typescriptChecked,
	}

	dataBlog = append(dataBlog, addBlog)

	return c.Redirect(http.StatusMovedPermanently, "/")
}
