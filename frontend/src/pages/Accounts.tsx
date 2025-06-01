import React, { useState } from 'react';

interface Account {
  id: number;
  website_name: string;
  website_url: string;
  identity_used: string;
  is_active: boolean;
  signup_completed: boolean;
  created_at: string;
  last_login: string;
  automation_success: boolean;
  notes: string;
}

const Accounts: React.FC = () => {
  const [accounts] = useState<Account[]>([
    {
      id: 1,
      website_name: "GitHub",
      website_url: "https://github.com",
      identity_used: "Professional Identity",
      is_active: true,
      signup_completed: true,
      created_at: "2024-01-20",
      last_login: "2024-01-25",
      automation_success: true,
      notes: "Used for software development projects"
    },
    {
      id: 2,
      website_name: "LinkedIn",
      website_url: "https://linkedin.com",
      identity_used: "Professional Identity",
      is_active: true,
      signup_completed: true,
      created_at: "2024-01-22",
      last_login: "2024-01-24",
      automation_success: true,
      notes: "Professional networking account"
    },
    {
      id: 3,
      website_name: "Twitter",
      website_url: "https://twitter.com",
      identity_used: "Personal Identity",
      is_active: true,
      signup_completed: false,
      created_at: "2024-01-23",
      last_login: "Never",
      automation_success: false,
      notes: "Email verification pending"
    },
    {
      id: 4,
      website_name: "Reddit",
      website_url: "https://reddit.com",
      identity_used: "Personal Identity",
      is_active: true,
      signup_completed: true,
      created_at: "2024-01-21",
      last_login: "2024-01-25",
      automation_success: true,
      notes: "Community discussions and tech news"
    },
    {
      id: 5,
      website_name: "StackOverflow",
      website_url: "https://stackoverflow.com",
      identity_used: "Professional Identity",
      is_active: true,
      signup_completed: true,
      created_at: "2024-01-19",
      last_login: "2024-01-24",
      automation_success: true,
      notes: "Technical Q&A and problem solving"
    }
  ]);

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'pending'>('all');

  const filteredAccounts = accounts.filter(account => {
    if (filterStatus === 'active') return account.is_active;
    if (filterStatus === 'completed') return account.signup_completed;
    if (filterStatus === 'pending') return !account.signup_completed;
    return true;
  });

  const getStatusBadge = (account: Account) => {
    if (!account.signup_completed) {
      return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>;
    }
    if (account.is_active) {
      return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>;
    }
    return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Inactive</span>;
  };

  const getAutomationBadge = (success: boolean) => {
    return success ? 
      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">✓ Automated</span> :
      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">✗ Manual</span>;
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Management</h1>
          <p className="text-gray-600">Track and manage your automated account creations</p>
        </div>
        <button className="btn-primary">
          + Add Account
        </button>
      </div>

      {/* Demo Notice */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-1">🎮 Demo Mode</h3>
        <p className="text-sm text-blue-800">
          In the full version, credentials would be encrypted and automation scripts would be fully functional.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-primary-600">{accounts.length}</h3>
          <p className="text-gray-600 text-sm">Total Accounts</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-green-600">{accounts.filter(a => a.signup_completed).length}</h3>
          <p className="text-gray-600 text-sm">Completed</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-yellow-600">{accounts.filter(a => !a.signup_completed).length}</h3>
          <p className="text-gray-600 text-sm">Pending</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-blue-600">{Math.round((accounts.filter(a => a.automation_success).length / accounts.length) * 100)}%</h3>
          <p className="text-gray-600 text-sm">Auto Success</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6">
        {(['all', 'active', 'completed', 'pending'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setFilterStatus(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              filterStatus === filter
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Accounts Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Identity Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Automation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {account.website_name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{account.website_name}</div>
                        <div className="text-sm text-gray-500">{account.website_url}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.identity_used}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(account)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getAutomationBadge(account.automation_success)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(account.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedAccount(account)}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Details Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedAccount.website_name} Account</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <p className="text-gray-900">{selectedAccount.website_name}</p>
                <p className="text-sm text-gray-500">{selectedAccount.website_url}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Identity Used</label>
                <p className="text-gray-900">{selectedAccount.identity_used}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  {getStatusBadge(selectedAccount)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Automation</label>
                  {getAutomationBadge(selectedAccount.automation_success)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created</label>
                  <p className="text-gray-900">{new Date(selectedAccount.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Login</label>
                  <p className="text-gray-900">
                    {selectedAccount.last_login === 'Never' ? 'Never' : new Date(selectedAccount.last_login).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <p className="text-gray-900">{selectedAccount.notes}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setSelectedAccount(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              <button className="btn-primary">
                Manage Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts; 