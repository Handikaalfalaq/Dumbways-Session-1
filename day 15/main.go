package main

import (
	"context"
	"fmt"
	"html/template"
	"os"

	"net/http"
	"personal-web/connection"
	"strconv"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
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

type User struct {
	Id       int
	Name     string
	Email    string
	Password string
	Role     string
	Newblog  []string
}

func main() {
	connection.DatabaseConnect()
	// create new echo
	e := echo.New()

	// serve static files from public directory / css
	e.Static("/assets", "assets")

	// initialitation to use session
	e.Use(session.Middleware(sessions.NewCookieStore([]byte("session"))))

	// routing
	e.GET("/", home)
	e.GET("/blog", blog)
	e.GET("/logout", logOut)
	e.GET("/contact-me", contactMe)
	e.GET("/blog-detail/:id", blogDetail)
	e.GET("/delete-blog/:id", deleteBlog)
	e.GET("/edit-blog/:id", editBlog)
	e.GET("/form-login", formLogin)
	e.GET("/form-register", formRegister)

	e.POST("/add-blog", addBlog)
	e.POST("/confirm-delete/:id", confirmDelete)
	e.POST("/edit-blog/:id", editBlogFinished)
	e.POST("/login", login)
	e.POST("/register", register)

	e.Logger.Fatal(e.Start("localhost:5000"))
}

func home(c echo.Context) error {
	sess, _ := session.Get("session", c)
	notif, _ := session.Get("notif", c)

	tmpl, err := template.ParseFiles("views/index.html")
	if err != nil {
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

	flash := map[string]interface{}{
		"flashStatusLogin": sess.Values["isLogin"],
		"flashName":        sess.Values["name"],
		"flashId":          sess.Values["id"],
		"blogHome":         result,
		"FlashStatus":      "",
		"FlashMessage":     "",
	}

	if notif.Values["status"] != nil {
		flash["FlashStatus"] = notif.Values["status"]
		delete(notif.Values, "status")
	}

	if notif.Values["message"] != nil {
		flash["FlashMessage"] = notif.Values["message"]
		delete(notif.Values, "message")
	}
	notif.Save(c.Request(), c.Response())

	return tmpl.Execute(c.Response(), flash)
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
	blogData.DurationDay = strconv.Itoa(day)
	blogData.DurationMonth = strconv.Itoa(month)
	blogData.Year = strconv.Itoa(year)
	blogData.NewStartDate = date1.Format("02 jan 2006")
	blogData.NewStartDate = date2.Format("02 jan 2006")

	blogData.Nodejs = blogData.Technology[0]
	blogData.Nextjs = blogData.Technology[1]
	blogData.Reactjs = blogData.Technology[2]
	blogData.Typescript = blogData.Technology[3]

	sess, _ := session.Get("session", c)
	data := map[string]interface{}{
		"dataDetail": blogData,
		"isLogin":    false,
	}
	if sess.Values["isLogin"] != nil {
		data["isLogin"] = sess.Values["isLogin"]
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
		_, _ = connection.Conn.Exec(context.Background(), "DELETE FROM tb_blog WHERE id = $1", id)
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

	NodejsChecked := ""
	if blogData.Technology[0] == "nodejsInput" {
		NodejsChecked = "checked"
	}

	NextjsChecked := ""
	if blogData.Technology[1] == "nextjsInput" {
		NextjsChecked = "checked"
	}

	ReactjsChecked := ""
	if blogData.Technology[2] == "reactjsInput" {
		ReactjsChecked = "checked"
	}

	TypescriptChecked := ""
	if blogData.Technology[3] == "typescriptInput" {
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
		fmt.Fprintf(os.Stderr, "Unable to execute query: %v\n", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func formRegister(c echo.Context) error {
	tmpl, err := template.ParseFiles("views/register.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	notif, _ := session.Get("notif", c)
	flash := map[string]interface{}{
		"FlashStatus":  "",
		"FlashMessage": "",
	}

	if notif.Values["status"] != nil {
		flash["FlashStatus"] = notif.Values["status"]
		delete(notif.Values, "status")
	}

	if notif.Values["message"] != nil {
		flash["FlashMessage"] = notif.Values["message"]
		delete(notif.Values, "message")
	}

	notif.Save(c.Request(), c.Response())

	return tmpl.Execute(c.Response(), flash)
}

func register(c echo.Context) error {
	err := c.Request().ParseForm()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	name := c.FormValue("name")
	email := c.FormValue("email")
	password := c.FormValue("password")

	user := User{}
	err = connection.Conn.QueryRow(context.Background(), "SELECT email FROM tb_user WHERE email=$1", email).Scan(&user.Email)
	if err == nil {
		return redirectWithMessage(c, "Register failed, Email has been registered ❌", false, "/form-register")
	}

	// generate password
	passwordHash, _ := bcrypt.GenerateFromPassword([]byte(password), 10)

	_, err = connection.Conn.Exec(context.Background(), "INSERT INTO tb_user (name, email, password) VALUES ($1, $2, $3)", name, email, passwordHash)
	if err != nil {
		return redirectWithMessage(c, "Register failed, please try again :", false, "/form-register")
	}

	return redirectWithMessage(c, "Register success ✔", true, "/form-login")
}

func formLogin(c echo.Context) error {
	tmpl, err := template.ParseFiles("views/login.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	notif, _ := session.Get("notif", c)
	flash := map[string]interface{}{
		"FlashStatus":  "",
		"FlashMessage": "",
	}

	if notif.Values["status"] != nil {
		flash["FlashStatus"] = notif.Values["status"]
		delete(notif.Values, "status")
	}

	if notif.Values["message"] != nil {
		flash["FlashMessage"] = notif.Values["message"]
		delete(notif.Values, "message")
	}

	notif.Save(c.Request(), c.Response())

	return tmpl.Execute(c.Response(), flash)
}

func login(c echo.Context) error {
	err := c.Request().ParseForm()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	email := c.FormValue("email")
	password := c.FormValue("password")

	user := User{}
	err = connection.Conn.QueryRow(context.Background(), "SELECT id, name, email, password FROM tb_user WHERE email=$1", email).Scan(&user.Id, &user.Name, &user.Email, &user.Password)

	if err != nil {
		return redirectWithMessage(c, "unregistered e-mail❌", false, "/form-login")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return redirectWithMessage(c, "password incorrect ❌", false, "/form-login")
	}

	notif, _ := session.Get("notif", c)
	notif.Options.MaxAge = 5
	notif.Values["message"] = "Login Success"
	notif.Values["status"] = true
	notif.Save(c.Request(), c.Response())

	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = 300
	sess.Values["name"] = user.Name
	sess.Values["id"] = user.Id
	sess.Values["isLogin"] = true
	sess.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusMovedPermanently, "/")
}

func logOut(c echo.Context) error {
	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = -1
	sess.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusTemporaryRedirect, "/")
}

func redirectWithMessage(c echo.Context, message string, status bool, path string) error {
	notif, _ := session.Get("notif", c)
	notif.Values["message"] = message
	notif.Values["status"] = status
	notif.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusMovedPermanently, path)
}

 