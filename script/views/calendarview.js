export default class Calendar {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        container: document.body,
        element: document.createElement("div"),
        data: [],
        dateToday: new Date(),
        today: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1,
          0,
          0,
          0
        ).setDate(new Date().getDate()),
        days: [],
        callBack: () => {},
      },
      options
    );

    this.element = document.createElement("div");
    this.element.className = "calendar";
    this._getDays();
    this._appendBody();
    this._addListener();
    this._renderMonth();
    this.options.container.append(this.element);
  }

  _appendBody() {
    this.element.innerHTML = `<div class="calendar">
    <div class="calendar__window">
      <div class="calendar__header">
        <div class="month">
          <span class="month__prev"></span>
          <h1 class="month__current">January</h1>
          <span class="month__next"></span>
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
        ${this._appendDays()}
        </div>
      </div>
      <div class="calendar__footer">
        <div class="footer__content footer__content--1">
            completed my steps <strong>AND</strong> joined a class or a workout
        </div>
        <div class="footer__content footer__content--2">
            completed my steps <strong>OR</strong> joined a class or a workout
        </div>
        <div class="footer__content footer__content--3">
           it was a tough day, wasn't able to do either
        </div>
      </div>
    </div>
  </div>`;
  }

  _appendDays() {
    return this.options.days
      .map((day, dayIndex) => {
        const newDate = new Date(day);
        const currentMonth =
          newDate < this.options.currentMonthStart
            ? "day--previous"
            : newDate > this.options.currentMonthEnd
            ? "day--next"
            : "day--present";
        const currentDay = this.options.today === day ? "today" : "";

        const response = this.options.data.find((datum) => {
          return datum.date == day;
        });

        let mark = "";

        if (response) {
          switch (response.responseIndex) {
            case 0:
              mark = "day--checked";
              break;

            case 1:
              mark = "day--checked";
              break;

            case 2:
              mark = "day--starred";
              break;

            case 3:
              mark = "day--neither";
              break;

            default:
              mark = "";
              break;
          }
        }

        return `<div class="day ${currentMonth}  ${mark}" data-date="${day}">
            <div class="date-number ${currentDay}"> ${newDate.getDate()}</div>
        </div>`;
      })
      .join("");
  }

  _renderMonth() {
    const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    });
    // const months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];

    this.element.querySelector(".month h1").innerHTML = dateTimeFormat.format(
      this.options.dateToday
    );
  }

  _getDays() {
    // lastDay
    this.options.currentMonthEnd = new Date(
      this.options.dateToday.getFullYear(),
      this.options.dateToday.getMonth() + 1,
      0,
      0,
      0,
      0
    );

    // firstDay
    this.options.currentMonthStart = new Date(
      this.options.dateToday.getFullYear(),
      this.options.dateToday.getMonth(),
      1,
      0,
      0,
      0
    );

    // prevLastDay
    this.options.lastMonthEnd = new Date(
      this.options.dateToday.getFullYear(),
      this.options.dateToday.getMonth(),
      0,
      0,
      0,
      0
    );

    this.options.days = Array.from(
      { length: this.options.currentMonthStart.getDay() },
      (_, i) => new Date(this.options.currentMonthStart).setDate(-i)
    ).reverse();

    this.options.days = this.options.days.concat(
      Array.from({ length: this.options.currentMonthEnd.getDate() }, (_, i) =>
        new Date(this.options.currentMonthStart).setDate(i + 1)
      )
    );

    this.options.days = this.options.days.concat(
      Array.from({ length: 42 - this.options.days.length }, (_, i) =>
        new Date(this.options.currentMonthEnd).setDate(
          this.options.currentMonthEnd.getDate() + i + 1
        )
      )
    );
  }

  _addListener() {
    this.element.addEventListener("click", (e) => {
      if (e.target.closest(".button-calendar")) {
        this.options.callBack();
        return;
      }

      if (
        e.target.closest(".month__prev") ||
        e.target.closest(".month__next")
      ) {
        const newDate = new Date(this.options.dateToday);

        if (e.target.closest(".month__next")) {
          this.options.dateToday = new Date(
            this.options.dateToday.getFullYear(),
            this.options.dateToday.getMonth() + 1,
            1
          );
          // this.options.dateToday = new Date(
          //   newDate.setMonth(newDate.getMonth() + 1)
          // );
        }

        if (e.target.closest(".month__prev")) {
          this.options.dateToday = new Date(
            this.options.dateToday.getFullYear(),
            this.options.dateToday.getMonth() - 1,
            1
          );
          // this.options.dateToday = new Date(
          //   newDate.setMonth(newDate.getMonth() - 1)
          // );
        }

        this._getDays();
        // this.element.querySelector(".days").innerHTML = this._appendDays();
        this._update();
        this._renderMonth();

        return;
      }
    });
  }

  _update() {
    const newMarkup = this._appendDays();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll(".day"));
    const currentElements = Array.from(this.element.querySelectorAll(".day"));

    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];

      if (!newElement.isEqualNode(currentElement)) {
        currentElement.innerHTML = newElement.innerHTML;
        // currentElement.className = newElement.className;
        Array.from(newElement.attributes).forEach((attr) =>
          currentElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  refresh(data) {
    this.options.data = data;
    this.options.dateToday = new Date();
    this._getDays();
    this._update();
    this._renderMonth();
  }
  import() {
    return this.element.innerHTML;
  }
}
