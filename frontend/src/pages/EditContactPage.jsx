import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import ContactForm from "../components/ContactForm";
import { getContact, updateContact } from "../../api/contactApi";

function EditContactPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadContact() {
      try {
        const data = await getContact(id);
        setContact(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadContact();
  }, [id]);

  async function handleUpdateContact(formData) {
    try {
      setIsSubmitting(true);

      await updateContact(id, formData);

      toast.success("Contact updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Contact not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-2xl font-bold">Edit Contact</h1>

            <ContactForm
              initialValues={{
                name: contact.name ?? "",
                email: contact.email ?? "",
                phone: contact.phone ?? "",
              }}
              onSubmit={handleUpdateContact}
              submitLabel="Update Contact"
              isSubmitting={isSubmitting}
            />

            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditContactPage;
















































// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import { getContact, updateContact } from "../../api/contactApi";
// import { toast } from "react-hot-toast";

// function EditContactPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   async function loadContact() {
//     try {
//       const data = await getContact(id);

//       setFormData({
//         name: data.name ?? "",
//         email: data.email ?? "",
//         phone: data.phone ?? "",
//       });
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

//   useEffect(() => {
//     loadContact();
//   }, [id]);

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       await updateContact(id, formData);
//       toast.success("Contact updated");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-base-200 px-4 py-8">
//       <div className="mx-auto max-w-lg">
//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <h1 className="text-2xl font-bold">Edit Contact</h1>

//             <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//               <input
//                 className="input input-bordered w-full"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Name"
//                 required
//               />

//               <input
//                 className="input input-bordered w-full"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 required
//               />

//               <input
//                 className="input input-bordered w-full"
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone"
//                 required
//               />

//               <div className="flex justify-end gap-3">
//                 <button
//                   type="button"
//                   className="btn btn-ghost"
//                   onClick={() => navigate("/dashboard")}
//                 >
//                   Cancel
//                 </button>

//                 <button type="submit" className="btn btn-primary">
//                   Update Contact
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditContactPage;