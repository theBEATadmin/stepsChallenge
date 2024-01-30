export default class StepsForm {
  constructor() {}

  import() {
    return `  <form class="form">
    <div class="form__content form__content--narrow ">
      <div class="form__content__text">
        <h1 class="form-subtitle">
          <strong class="the-beat">theBEAT</strong> Studio
        </h1>
        <h2 class="form-title">your best is yet challenge</h2>
       
      </div>

      <div class="form__content__inputs">
        <input
          type="number"
          name="steps"
          placeholder="Total steps*"
          class="form__input"
          autocomplete="off"
          required
        />
        <input
          type="number"
          name="minutes"
          placeholder="Active minutes*"
          autocomplete="off"
          class="form__input"
          required
        />
      </div>

      <div class="form__content__links">
        <p class="form__link">
          Active minutes is the total time you spent walking and/or duoing a
          workout
        </p>
      </div>
    </div>
  </form>`;
  }
}
