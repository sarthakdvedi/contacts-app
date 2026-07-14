import { useState } from "react";
import { Mail, Phone, User } from "lucide-react";

function ContactForm({
  initialValues = {
    name: "",
    email: "",
    phone: "",
  },
  onSubmit,
  submitLabel,
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState(initialValues);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <label className="form-control">
        <span className="label-text mb-1">Name</span>

        <div className="input input-bordered flex items-center gap-2">
          <User size={18} />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter contact name"
            className="grow"
            required
          />
        </div>
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Email</span>

        <div className="input input-bordered flex items-center gap-2">
          <Mail size={18} />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="grow"
            required
          />
        </div>
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Phone</span>

        <div className="input input-bordered flex items-center gap-2">
          <Phone size={18} />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="grow"
            required
          />
        </div>
      </label>

      <button
        type="submit"
        className="btn btn-primary w-full mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Saving...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}

export default ContactForm;