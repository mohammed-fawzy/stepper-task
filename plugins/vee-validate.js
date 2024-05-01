import { configure, defineRule } from 'vee-validate';
import { required, numeric, email, url, min, max, confirmed } from '@vee-validate/rules';
export default defineNuxtPlugin(() => {
  defineRule('required', required);
  defineRule('numeric', numeric);
  defineRule('email', email);
defineRule('confirmed', (value, [targetField], ctx) => {
  const targetValue = ctx.form[targetField];
  return value === targetValue ? true : 'Passwords do not match.';
});
  defineRule("min", (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
        return true;
    }
    if (value.length < limit) {
        return `Minimum ${limit} characters.`;
    }
    return true;
  });

  defineRule("max", (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
        return true;
    }
    if (value.length > limit) {
        return `Maximum ${limit} characters.`;
    }
    return true;
  });

  defineRule("startWithOneOrTwo", (value) => {
    if (/^(?:[12].*|)$/.test(value)) {
      return true
    } else {
      return "Must start with 1 or 2.";
    }
  });

  // al least one uppercase letter and at least one lowercase letter and at least one special character any order
  defineRule("password", (value) => {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
      return true
    } else {
      return "Must contain at least one uppercase letter, one lowercase letter, and one special character.";
    }
  })
})

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The field ${ctx.field} is required.`,
      numeric: `The field ${ctx.field} must be a numeric value.`,
    };
    return messages[ctx.rule.name] || `The field ${ctx.field} is invalid.`;
  }
});