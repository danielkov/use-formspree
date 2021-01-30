# use-formspree

React hook to simplify creating forms with [FormSpree](https://formspree.io/).

## Getting Started

Install with:

```sh
yarn add use-formspree # or npm install use-formspree
```

## Usage

Inside your components

```tsx
import useFormSpree from "use-formspree";

const url = "https://formspree.io/f/<your form id>";

const Form = () => {
  const [{ error, loading, response }, bind] = useFormSpree(url, {
    // reset the form after submit
    reset: true,
  });

  if (response) {
    return <p>Thank you for submitting.</p>;
  }

  return (
    <form {...bind}>
      <label>
        Name: <input type="text" name="name" />
      </label>
      <label>
        E-mail: <input type="email" name="email" />
      </label>
      <button type="submit" disabled={error || loading}>
        Send
      </button>
      {error && <p>Woops. {String(error)}</p>}
    </form>
  );
};
```
