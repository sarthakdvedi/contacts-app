import { Link } from "react-router";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ContactCard from "../components/ContactCard";
import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../../api/contactApi";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { logout } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // for loading contact list from api
  const [deletingId, setDeletingId] = useState(null); // for deleting contact from api

  async function loadContacts() {
    try {
      setLoading(true);

      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function handleDelete(id, name) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!shouldDelete) {
      return;
    }

    // is function k dauran total 3 rerenders honge
    try {
      setDeletingId(id);
      await deleteContact(id);
      // Delete success hone ke baad UI se bhi remove karna zaruri hai

      // iski wajah se rerender hoga kyoki state is changed
      setContacts((prevContacts) =>
        prevContacts.filter(contact => contact._id !== id)
      );

      // rerender hone ke baad contact list update ho jayega aur deleted contact remove ho jayega
      toast.success("Contact deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">

      <Navbar />

      {/* <div className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Contacts App</h1>
        </div>

        <div className="flex gap-2">
          <Link to="/contacts/add" className="btn btn-primary">
            <Plus size={18} />
            Add Contact
          </Link>

          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </div>
      </div> */}

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Contacts</h2>


        {loading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-secondary"></span>
          </div>
        ) : contacts.length === 0 ? ( // bich m condition daldi
          <div className="py-16 text-center">
            <h3 className="text-xl font-semibold">No contacts yet</h3>

            <p className="mt-2 text-base-content/60">
              Add your first contact to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onDelete={handleDelete}
                isDeleting={deletingId === contact._id} /> // y boolean expression h
              // IMPORTANT - ContactCard does not have any prop as 'key'
              // still we pass it --->  React intentionally key pass nahi karta.

              // key is for react only - UI render krne k liye list items ko identify krne k liye
              // React ko list update karni hoti hai.
              //To kisi change p utna hi DOM chuega
              //Baaki touch bhi nahi karega.
              //Isliye rendering fast hoti hai.

              // yahi rule sab Components pr apply hoga jo list mai render honge
            ))}
          </div>
        )
        }
      </main>
    </div>
  );
}

export default Dashboard;