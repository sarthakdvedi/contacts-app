import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import ContactForm from "../components/ContactForm";
import { createContact } from "../../api/contactApi";

function AddContactPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddContact(formData) {
    try {
      setIsSubmitting(true);

      await createContact(formData);

      toast.success("Contact added successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-2xl font-bold">Add Contact</h1>

            <p className="text-base-content/60">
              Save a new contact to your account
            </p>

            <ContactForm
              onSubmit={handleAddContact}
              submitLabel="Add Contact"
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

export default AddContactPage;







































// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { createContact } from "../../api/contactApi";
// import { ArrowLeft, User, Mail, Phone } from "lucide-react";
// import { toast } from "react-hot-toast";

// function AddContactPage() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createContact(formData);
//       toast.success("Contact added");
//       navigate("/dashboard");

//     }
//     catch (err) {
//       toast.error(err.message);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-base-200 px-4 py-8">
//       <div className="mx-auto w-full max-w-lg">
//         <button
//           type="button"
//           onClick={() => navigate("/dashboard")}
//           className="btn btn-ghost mb-4"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>

//         <div className="card bg-base-100 shadow-xl">
//           <div className="card-body">
//             <div>
//               <h1 className="text-2xl font-bold">Add Contact</h1>
//               <p className="mt-1 text-base-content/60">
//                 Save a new contact to your account
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//               <label className="form-control">
//                 <span className="label-text mb-1">Name</span>

//                 <div className="input input-bordered flex items-center gap-2">
//                   <User size={18} />

//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter contact name"
//                     className="grow"
//                     required
//                   />
//                 </div>
//               </label>

//               <label className="form-control">
//                 <span className="label-text mb-1">Email</span>

//                 <div className="input input-bordered flex items-center gap-2">
//                   <Mail size={18} />

//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter email address"
//                     className="grow"
//                     required
//                   />
//                 </div>
//               </label>

//               <label className="form-control">
//                 <span className="label-text mb-1">Phone</span>

//                 <div className="input input-bordered flex items-center gap-2">
//                   <Phone size={18} />

//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                     className="grow"
//                     required
//                   />
//                 </div>
//               </label>

//               <div className="flex justify-end gap-3 pt-3">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/dashboard")}
//                   className="btn btn-ghost"
//                 >
//                   Cancel
//                 </button>

//                 <button type="submit" className="btn btn-primary">
//                   Add Contact
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddContactPage;