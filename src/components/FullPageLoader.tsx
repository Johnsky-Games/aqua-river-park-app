export default function FullPageLoader() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-bgDark z-50">
        <div className="text-xl font-bold animate-pulse text-primary">
          Cargando...
        </div>
      </div>
    );
  }
  