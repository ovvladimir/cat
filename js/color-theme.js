(() => {
  const currentTheme = localStorage.getItem("theme")
  const getLocalTheme = () => {
    if (currentTheme) { return currentTheme }
    return document.querySelector(".active").getAttribute('data-bs-theme-value')
  }
  const setTheme = function (theme) {
    const formControl = document.querySelector(".main")
    if (theme === "dark") {formControl.style.backgroundColor = "#212529"; formControl.style.color = "#f8f9fa"}
    else {formControl.style.backgroundColor = "#f8f9fa"; formControl.style.color = "#212529"}
  }
  setTheme(currentTheme)
  // console.log(currentTheme)

  const showActiveTheme = (theme) => {
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('i use').getAttribute('href')
    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    document.getElementById("icon-active").className = "bi " + svgOfActiveBtn + " mb-3 fs-2"
  }

  showActiveTheme(getLocalTheme())
  document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const theme = toggle.getAttribute('data-bs-theme-value')
      localStorage.setItem('theme', theme)
      setTheme(theme)
      showActiveTheme(theme)
    })
  })
})()