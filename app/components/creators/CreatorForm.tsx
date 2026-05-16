import { Form } from "react-router";

export type Creator = {
  id?: number;
  name: string;
  url: string;
  description: string;
  imageURL: string;
};

export default function CreatorForm() {

  return (
    
    <main className="container">
      <article>
        <header>
          <h1>Add Creator</h1>

          <p>Submit your favorite content creator</p>
        </header>

        <Form method="post">
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Creator name"
              required
            />
          </label>

          <label htmlFor="url">
            Creator URL
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://youtube.com/..."
              required
            />
          </label>

          <label htmlFor="imageURL">
            Image URL
            <input
              id="imageURL"
              name="imageURL"
              type="url"
              placeholder="https://..."
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Tell us about this creator..."
              rows={5}
              required
            />
          </label>

          <button type="submit">Add Creator</button>
        </Form>
      </article>
    </main>
  );
}
