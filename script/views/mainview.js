export default class MainView {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("div"),
        callback: () => {},
        username: "User Name Here",
      },
      options
    );
  }

  render() {
    this.options.element.innerHTML = `<header class="header">
      <div class="header__logo">
        <img src="./svg/logoColored.svg" alt="theBEAT Logo-Colored" />
      </div>
      <hr />
      <div class="header__info">
      <div class="header__participant">${this.options.username}</div>
      <div class="header__date">${new Date().toDateString()}</div>
      </div>
    </header>

    <main class="main">
       
      <section class="section">
        <div for="accordionLefBottom" class="section__title">
          DASHBOARD
        </div>
      </section>
   
      <section class="section">
        <div for="accordionLefBottom" class="section__title">
          LEADER BOARD
        </div>
      </section>

     

      <section class="section">
      <div for="accordionLefBottom" class="section__title">
      DAILY TRACKER
    </div>
        <div class="calendar">
        <div class="calendar__window">
          <div class="calendar__header">
            <div class="month">
              <span class="month__prev">  </span>
              <h1 class="month__current">January</h1>
              <span class="month__next">  </span>
            </div>
          </div>

          <div class="calendar__content">
            <div class="weekdays">
              <div class="weekday">Sun</div>
              <div class="weekday">Mon</div>
              <div class="weekday">Tue</div>
              <div class="weekday">Wed</div>
              <div class="weekday">Thu</div>
              <div class="weekday">Fri</div>
              <div class="weekday">Sat</div>
            </div>
            <div class="days">
              <div class="day day--previous" data-date="">
                <span class="date-number">31</span>
                <span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">1</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">2</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">3</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">4</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">5</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">6</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">7</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">8</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">9</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">10</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">11</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">12</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">13</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">14</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">15</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">16</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">17</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">18</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">19</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">20</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">21</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">22</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">23</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">24</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">25</span>
                <span class="marker marker--starred marker--checked"></span>
              </div>
              <div class="day">
                <span class="date-number">26</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">27</span
                ><span class="marker marker--starred"></span>
              </div>
              <div class="day">
                <span class="date-number">28</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">29</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">30</span
                ><span class="marker"></span>
              </div>
              <div class="day">
                <span class="date-number">31</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">1</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">2</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">3</span>
                <span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">4</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">5</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">6</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">7</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">8</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">9</span
                ><span class="marker"></span>
              </div>
              <div class="day day--next">
                <span class="date-number">10</span
                ><span class="marker"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      </section>
      
     
    </main>`;

    this.options.container.insertAdjacentElement(
      "afterbegin",
      this.options.element
    );

    this.options.callback();
  }
  remove() {
    this.options.element.remove();
  }
}
