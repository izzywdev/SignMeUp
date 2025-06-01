import React, { useState } from 'react';

interface Identity {
  id: number;
  name: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  location: string;
  created_at: string;
  accountsCount: number;
}

const Identities: React.FC = () => {
  const [identities] = useState<Identity[]>([
    {
      id: 1,
      name: "Professional Identity",
      description: "For business and professional accounts",
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.johnson.pro@email.com",
      profession: "Software Developer",
      location: "San Francisco, CA",
      created_at: "2024-01-15",
      accountsCount: 5
    },
    {
      id: 2,
      name: "Personal Identity",
      description: "For social media and personal accounts",
      firstName: "Alex",
      lastName: "J",
      email: "alexj.personal@email.com",
      profession: "Tech Enthusiast",
      location: "California, USA",
      created_at: "2024-01-20",
      accountsCount: 3
    }
  ]);

  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Digital Identities</h1>
          <p className="text-gray-600">Manage your encrypted digital identities for different use cases</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          + Create Identity
        </button>
      </div>

      {/* Demo Notice */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-1">🎮 Demo Mode</h3>
        <p className="text-sm text-blue-800">
          In the full version, all identity data would be encrypted with your master key and stored securely.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {identities.map((identity) => (
          <div key={identity.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{identity.name}</h3>
                <p className="text-gray-600 text-sm">{identity.description}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {identity.accountsCount} accounts
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Name:</span>
                <span className="text-sm font-medium">{identity.firstName} {identity.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Email:</span>
                <span className="text-sm font-medium">{identity.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Profession:</span>
                <span className="text-sm font-medium">{identity.profession}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Location:</span>
                <span className="text-sm font-medium">{identity.location}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                Created {new Date(identity.created_at).toLocaleDateString()}
              </span>
              <button 
                onClick={() => setSelectedIdentity(identity)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Identity Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Identity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identity Name</label>
                <input type="text" className="input-field" placeholder="e.g., Work Identity" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input type="text" className="input-field" placeholder="e.g., For professional accounts" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="input-field" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  // In real app, would create the identity
                }}
                className="btn-primary"
              >
                Create Identity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Identity Details Modal */}
      {selectedIdentity && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedIdentity.name}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-gray-900">{selectedIdentity.firstName} {selectedIdentity.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedIdentity.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profession</label>
                <p className="text-gray-900">{selectedIdentity.profession}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-900">{selectedIdentity.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Accounts</label>
                <p className="text-gray-900">{selectedIdentity.accountsCount} active accounts</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Created</label>
                <p className="text-gray-900">{new Date(selectedIdentity.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setSelectedIdentity(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              <button className="btn-primary">
                Edit Identity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Identities; 