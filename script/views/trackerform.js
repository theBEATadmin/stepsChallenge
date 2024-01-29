export default class TrackerForm {
  constructor() {}

  import() {
    return `   <form class="form">
    <div class="form__content form__content--narrow">
      <div class="form__content__text">
        <h1 class="form-subtitle">
          <strong class="the-beat">theBEAT</strong> Studio
        </h1>
        <h2 class="form-title">your best is yet challenge</h2>
        <h2 class="form-subtitle">Week 1: 5 February 2024 | Monday</h2>
      </div>

      <div class="form__content__inputs">
        <div><strong>Today, I</strong>...</div>

        <div class="radio-container">
          <label for="radio1" class="radio">
            <input
              type="radio"
              name="radio"
              id="radio1"
              class="radio__input"
            />
            <div class="radio__radio"></div>
            <span class="radio__text"> completed my steps </span>
          </label>
        </div>

        <div class="radio-container">
          <label for="radio2" class="radio">
            <input
              type="radio"
              name="radio"
              id="radio2"
              class="radio__input"
            />
            <div class="radio__radio"></div>
            <span class="radio__text"> joined a class or a workout </span>
          </label>
        </div>

        <div class="radio-container">
          <label for="radio3" class="radio">
            <input
              type="radio"
              name="radio"
              id="radio3"
              class="radio__input"
            />
            <div class="radio__radio"></div>
            <span class="radio__text">
              completed my steps and joined or workout
            </span>
          </label>
        </div>

        <div class="radio-container">
          <label for="radio4" class="radio">
            <input
              type="radio"
              name="radio"
              id="radio4"
              class="radio__input"
            />
            <div class="radio__radio"></div>
            <span class="radio__text"> won't able to do either </span>
          </label>
        </div>
      </div>

      <div class="form__content__inputs">
        <div><strong>How do you feel about your day?</strong></div>
        <div class="rating">
          <label class="rating__label" for="rating1">
            <!-- <span class="material-icons"> star_rate </span> -->
          </label>
          <input
            class="rating__input"
            type="radio"
            name="rating"
            id="rating1"
          />

          <label class="rating__label" for="rating2">
            <!-- <span class="material-icons"> star_rate </span> -->
          </label>
          <input
            class="rating__input"
            type="radio"
            name="rating"
            id="rating2"
          />

          <label class="rating__label" for="rating3">
            <!-- <span class="material-icons"> star_rate </span> -->
          </label>
          <input
            class="rating__input"
            type="radio"
            name="rating"
            id="rating3"
          />

          <label class="rating__label" for="rating4">
            <!-- <span class="material-icons"> star_rate </span> -->
          </label>
          <input
            class="rating__input"
            type="radio"
            name="rating"
            id="rating4"
          />

          <label class="rating__label" for="rating5">
            <!-- <span class="material-icons"> star_rate </span> -->
          </label>
          <input
            class="rating__input"
            type="radio"
            name="rating"
            id="rating5"
          />
        </div>
      </div>
    </div>
  </form>`;
  }
}
