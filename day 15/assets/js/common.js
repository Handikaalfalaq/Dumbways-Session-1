const udin = document.querySelector("#udin");

udin.innerHTML = `<div class="container-fluid">
<a class="navbar-brand" href="https://dumbways.id/"
  ><img src="../assets/img/logo.png" alt=""
/></a>
<button
  class="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false"
  aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav me-auto mb-lg-0 d-flex align-items-center">
    <li class="nav-item">
      <a class="nav-link active text-black m-auto fw-semibold active"
        aria-current="page"
        href="/">Home
      </a>
    </li>

    {{if .flashStatusLogin}}
    <li class="nav-item">
      <a class="nav-link text-black fw-semibold" href="/blog"
        >Add Project
      </a>
    </li>
  </ul>
  <ul class="navbar-nav mb-lg-0 d-flex align-items-center">
    <li>
      <div class="nav-link text-black fw-semibold">Hallo, {{.flashName}}</div>
    </li>
    <li>
      <a class="nav-link text-black fw-semibold" href="/logout">Log Out</a>
    </li>
    <li>
      <a class="nav-link" href="/contact-me">
        <button class="contact-me btn btn-outline-primary">
          Contact Me
        </button>
      </a>
    </li>
  </ul>
    {{else}}
  </ul>
  <ul class="navbar-nav mb-lg-0 d-flex align-items-center">
    <li>
      <a class="nav-link text-black fw-semibold" href="/form-register"
        >Register</a
      >
    </li>
    <li>
      <a class="nav-link text-black fw-semibold" href="/form-login"
        >Login</a
      >
    </li>
  </ul>
  {{end}}
</div>
</div>`;
