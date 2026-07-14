import { Edit, Trash2, Mail, Phone, Loader2 } from "lucide-react";
import { Link } from "react-router";

function ContactCard({ contact, onDelete, isDeleting }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{contact.name}</h2>

        <p className="flex items-center gap-2">
          <Mail size={16} />
          {contact.email}
        </p>

        <p className="flex items-center gap-2">
          <Phone size={16} />
          {contact.phone}
        </p>

        <div className="card-actions justify-end mt-4">
          <Link to={`/contacts/edit/${contact._id}`} className="btn btn-sm btn-warning">
            <Edit size={16} />
            Edit
          </Link>


          <button
            onClick={() => onDelete(contact._id, contact.name)}
            className="btn btn-sm btn-error"
            disabled={isDeleting}>

            {isDeleting ? (
              <>
                <Loader2 />
                Deleting {contact.name}...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ContactCard;