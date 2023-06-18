import { Form, useLoaderData, useNavigate, redirect  } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="first name"
          aria-label="first_name"
          type="text"
          name="first_name"
          defaultValue={contact?.first_name || ''}
        />
        <input
          placeholder="last_name"
          aria-label="last_name"
          type="text"
          name="last_name"
          defaultValue={contact?.last_name || ''}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter || ''}
        />
      </label>
      <label>
        <span>Phone number</span>
        <input
          type="text"
          name="phone_number"
          placeholder="0123456789"
          defaultValue={contact?.phone_number || ''}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="abc@yopmail.com"
          defaultValue={contact?.email || ''}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar || ''}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes || ''}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button"
            onClick={() => {
                navigate(-1);
            }}
        >Cancel</button>
      </p>
    </Form>
  );
}