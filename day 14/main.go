package main

import (
	"context"
	"fmt"
	"html/template"

	// "log"
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
	StartDate         string //"2006-01-02"
	EndDate           string //"2006-01-02"
	NewStartDate      string //"02 jan 2006"
	NewEndDate        string //"02 jan 2006"
	Year              string
	DurationMonth     string
	DurationDay       string
	Technology        []string
	Nodejs            string
	Nextjs            string
	Reactjs           string
	Typescript        string
	NodejsChecked     string
	NextjsChecked     string
	ReactjsChecked    string
	TypescriptChecked string
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
	e.POST("/confirm-delete/:id", confirmDelete)
	e.GET("/edit-blog/:id", editBlog)
	e.POST("/edit-blog/:id", editBlogFinished)

	e.Logger.Fatal(e.Start("localhost:5000"))
}

func home(c echo.Context) error {
	tmpl, err := template.ParseFiles("views/index.html")
	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	// map (tipe data) => key and value
	data, _ := connection.Conn.Query(context.Background(), "SELECT id, title, content, image, startdate, enddate, technology FROM tb_blog")

	var result []Blog
	for data.Next() {
		var each = Blog{}
		err := data.Scan(&each.Id, &each.Title, &each.Content, &each.Image, &each.StartDate, &each.EndDate, &each.Technology)

		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
		}

		// string to data tipe time.time dengan format 2006-01-02
		date1, _ := time.Parse("2006-01-02", each.StartDate)
		date2, _ := time.Parse("2006-01-02", each.EndDate)

		// value tahun, difference date
		year := date1.Year()
		month := int(date2.Sub(date1).Hours() / 24 / 30)
		day := int(date2.Sub(date1).Hours()/24) - (month * 30)

		// data tipe time.time to string
		dayString := strconv.Itoa(day)
		monthString := strconv.Itoa(month)
		yearString := strconv.Itoa(year)
		NewStartDate := date1.Format("02 jan 2006")
		NewEndDate := date2.Format("02 jan 2006")

		each.DurationMonth = monthString
		each.DurationDay = dayString
		each.Year = yearString
		each.NewStartDate = NewStartDate
		each.NewEndDate = NewEndDate

		result = append(result, each)
	}

	dataBlog := map[string]interface{}{
		"blogHome": result,
	}
	fmt.Println(time.Now())

	return tmpl.Execute(c.Response(), dataBlog)
}

func blog(c echo.Context) error {
	tmpl, err := template.ParseFiles("views/blog.html")
	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}
	return tmpl.Execute(c.Response(), nil)
}

func contactMe(c echo.Context) error {
	tmpl, err := template.ParseFiles("views/contact-me.html")
	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}
	return tmpl.Execute(c.Response(), nil)
}

func blogDetail(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	tmpl, err := template.ParseFiles("views/blog-detail.html")

	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	// query data dari database
	var blogData Blog
	err = connection.Conn.QueryRow(context.Background(), "SELECT title, content, image, startdate, enddate, technology FROM tb_blog WHERE id = $1", id).Scan(&blogData.Title, &blogData.Content, &blogData.Image, &blogData.StartDate, &blogData.EndDate, &blogData.Technology)

	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	date1, _ := time.Parse("2006-01-02", blogData.StartDate)
	date2, _ := time.Parse("2006-01-02", blogData.EndDate)

	// value tahun, difference date
	year := date1.Year()
	month := int(date2.Sub(date1).Hours() / 24 / 30)
	day := int(date2.Sub(date1).Hours()/24) - (month * 30)

	// data tipe time.time to string
	dayString := strconv.Itoa(day)
	monthString := strconv.Itoa(month)
	yearString := strconv.Itoa(year)
	NewStartDate := date1.Format("02 jan 2006")
	NewEndDate := date2.Format("02 jan 2006")

	blogData.DurationMonth = monthString
	blogData.DurationDay = dayString
	blogData.Year = yearString
	blogData.NewStartDate = NewStartDate
	blogData.NewEndDate = NewEndDate

	blogData.Nodejs = blogData.Technology[0]
	blogData.Nextjs = blogData.Technology[1]
	blogData.Reactjs = blogData.Technology[2]
	blogData.Typescript = blogData.Technology[3]

	data := map[string]interface{}{
		"dataDetail": blogData,
	}
	return tmpl.Execute(c.Response(), data)
}

func addBlog(c echo.Context) error {
	Title := c.FormValue("titleInput")
	Content := c.FormValue("descriptionInput")
	StartDate := c.FormValue("startDate")
	EndDate := c.FormValue("endDate")
	Image := c.FormValue("imageInput")
	Technology := []string{c.FormValue("nodejsInput"), c.FormValue("nextjsInput"), c.FormValue("reactjsInput"), c.FormValue("typescriptInput")}

	_, err := connection.Conn.Exec(context.Background(), "INSERT INTO tb_blog (title, content, image, startdate, enddate, technology) VALUES ($1, $2, $3, $4, $5, $6)", Title, Content, Image, StartDate, EndDate, Technology)

	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func deleteBlog(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	tmpl, err := template.ParseFiles("views/index.html")
	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	data, _ := connection.Conn.Query(context.Background(), "SELECT id, title, content, image, startdate, enddate, technology FROM tb_blog")

	var result []Blog
	for data.Next() {
		var each = Blog{}
		err := data.Scan(&each.Id, &each.Title, &each.Content, &each.Image, &each.StartDate, &each.EndDate, &each.Technology)

		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
		}

		// string to data tipe time.time dengan format 2006-01-02
		date1, _ := time.Parse("2006-01-02", each.StartDate)
		date2, _ := time.Parse("2006-01-02", each.EndDate)

		// value tahun, difference date
		year := date1.Year()
		month := int(date2.Sub(date1).Hours() / 24 / 30)
		day := int(date2.Sub(date1).Hours()/24) - (month * 30)

		// data tipe time.time to string
		dayString := strconv.Itoa(day)
		monthString := strconv.Itoa(month)
		yearString := strconv.Itoa(year)
		NewStartDate := date1.Format("02 jan 2006")
		NewEndDate := date2.Format("02 jan 2006")

		each.DurationMonth = monthString
		each.DurationDay = dayString
		each.Year = yearString
		each.NewStartDate = NewStartDate
		each.NewEndDate = NewEndDate

		result = append(result, each)
	}
	confirm := "deleteconfirm"

	deleteData := map[string]interface{}{
		"blogHome": result,
		"id":       id,
		"confirm":  confirm,
	}

	return tmpl.Execute(c.Response(), deleteData)
}

func confirmDelete(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	answer := c.FormValue("answer")
	if answer == "yes" {
		var err error
		_, err = connection.Conn.Exec(context.Background(), "DELETE FROM tb_blog WHERE id = $1", id)
		if err != nil {
			fmt.Println(err.Error())
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
		}
	}
	return c.Redirect(http.StatusMovedPermanently, "/")
}

var idEdit int = 0

func editBlog(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	idEdit = id

	tmpl, _ := template.ParseFiles("views/edit-blog.html")

	var blogData Blog
	err = connection.Conn.QueryRow(context.Background(), "SELECT title, content, image, startdate, enddate, technology FROM tb_blog WHERE id = $1", idEdit).Scan(&blogData.Title, &blogData.Content, &blogData.Image, &blogData.StartDate, &blogData.EndDate, &blogData.Technology)
	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	blogData.Nodejs = blogData.Technology[0]
	blogData.Nextjs = blogData.Technology[1]
	blogData.Reactjs = blogData.Technology[2]
	blogData.Typescript = blogData.Technology[3]

	NodejsChecked := ""
	if blogData.Nodejs == "nodejsInput" {
		NodejsChecked = "checked"
	}

	NextjsChecked := ""
	if blogData.Nextjs == "nextjsInput" {
		NextjsChecked = "checked"
	}

	ReactjsChecked := ""
	if blogData.Reactjs == "reactjsInput" {
		ReactjsChecked = "checked"
	}

	TypescriptChecked := ""
	if blogData.Typescript == "typescriptInput" {
		TypescriptChecked = "checked"
	}

	editBlog := Blog{
		Title:             blogData.Title,
		Content:           blogData.Content,
		Image:             blogData.Image,
		StartDate:         blogData.StartDate,
		EndDate:           blogData.EndDate,
		NodejsChecked:     NodejsChecked,
		NextjsChecked:     NextjsChecked,
		ReactjsChecked:    ReactjsChecked,
		TypescriptChecked: TypescriptChecked,
	}

	data := map[string]interface{}{
		"blogEdit": editBlog,
	}

	return tmpl.Execute(c.Response(), data)
}

func editBlogFinished(c echo.Context) error {

	var editBlog = Blog{
		Title:      c.FormValue("titleInput"),
		Content:    c.FormValue("descriptionInput"),
		StartDate:  c.FormValue("startDate"),
		EndDate:    c.FormValue("endDate"),
		Image:      c.FormValue("imageInput"),
		Nodejs:     c.FormValue("nodejsInput"),
		Nextjs:     c.FormValue("nextjsInput"),
		Reactjs:    c.FormValue("reactjsInput"),
		Typescript: c.FormValue("typescriptInput"),
		Technology: []string{c.FormValue("nodejsInput"), c.FormValue("nextjsInput"), c.FormValue("reactjsInput"), c.FormValue("typescriptInput")},
	}

	_, err := connection.Conn.Exec(context.Background(), "UPDATE tb_blog SET title=$1, content=$2, image=$3, startdate=$4, enddate=$5, nodejs=$6, nextjs=$7, reactjs=$8, typescript=$9, technology=$10 WHERE id=$11", editBlog.Title, editBlog.Content, editBlog.Image, editBlog.StartDate, editBlog.EndDate, editBlog.Nodejs, editBlog.Nextjs, editBlog.Reactjs, editBlog.Typescript, editBlog.Technology, idEdit)

	if err != nil {
		fmt.Println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}
