
export function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="admin-layout">
        <header className="admin-header">
            <h1>Admin Dashboard</h1>
        </header>
        <nav className="admin-nav">
            <ul>
            <li><a href="/admin/users">Users</a></li>
            <li><a href="/admin/settings">Settings</a></li>
            <li><a href="/admin/reports">Reports</a></li>
            </ul>
        </nav>
        <main className="admin-content">
            {children}
        </main>
        </div>
    );
}