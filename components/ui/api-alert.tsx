import { Server } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin',
};


const textMap: Record<ApiAlertProps["variant"], string> = {
  public: 'Public',
  admin: 'Admin'
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: 'secondary',
  admin: 'destructive'
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public"
}) => {
  return ( 
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
      </AlertDescription>
    </Alert>
   );
};
