import React from "react";

type PlaceholderPageProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title = "Em desenvolvimento",
  subtitle,
  description,
  children,
}) => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-2xl font-bold text-gray-800">
          {title}
        </h1>

        <p className="text-gray-600 mt-3">
          {description || subtitle || 
          "Esta funcionalidade estará disponível em breve no Sistema GCF."}
        </p>

        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}

      </div>
    </div>
  );
};

export default PlaceholderPage;