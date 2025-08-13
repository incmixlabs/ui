# AutoForm Component

A powerful, schema-driven form generator that creates fully-featured forms from JSON schemas or Zod schemas with minimal code.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [JSON Schema Format](#json-schema-format)
- [Field Configuration](#field-configuration)
- [Field Types](#field-types)
- [Features](#features)
  - [Default Values & Form Editing](#default-values--form-editing)
  - [Disabling Fields](#disabling-fields)
  - [Field Grouping](#field-grouping)
  - [Conditional Fields](#conditional-fields)
  - [Custom Field Rendering](#custom-field-rendering)
  - [File Uploads](#file-uploads)
  - [Multi-select Fields](#multi-select-fields)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Form Validation](#form-validation)
- [Error Handling and Display](#error-handling-and-display)
- [Advanced Features](#advanced-features)
  - [Number Coercion](#number-coercion)
  - [Schema Conversion Details](#schema-conversion-details)
  - [Custom Input Components](#custom-input-components)
  - [Dependencies Types](#dependencies-types)
  - [Conditional Fields](#conditional-fields-1)

## Overview

AutoForm is designed to simplify form creation by generating forms directly from schemas. It handles:

- Form state management using react-hook-form
- Form validation using Zod schemas
- Dynamic field rendering based on schema types
- Complex field grouping and layouts
- Conditional field logic
- Pre-populating forms for editing

## Installation

The AutoForm component relies on the following dependencies:

- react-hook-form
- zod
- @hookform/resolvers/zod
- json-schema-to-zod (for JSON schema support)

## Basic Usage

```tsx
import AutoForm from "@components/auto-form"

// Define your form schema
const formSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
  },
  required: ["name", "email"],
}

// Optional field configuration
const fieldConfig = {
  name: {
    description: "Your full name",
    inputProps: {
      placeholder: "John Doe",
    },
  },
  email: {
    description: "Your email address",
    inputProps: {
      placeholder: "john@example.com",
    },
  },
}

function MyForm() {
  const handleSubmit = (data) => {
    console.log("Form submitted:", data)
  }

  return (
    <AutoForm
      formSchema={formSchema}
      fieldConfig={fieldConfig}
      onSubmit={handleSubmit}
    >
      <div className="mt-4 flex justify-end">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </AutoForm>
  )
}
```

## JSON Schema Format

The AutoForm component accepts a standard JSON Schema object with the following structure:

```typescript
{
  type: "object",
  properties: {
    [fieldName]: {
      type: string,       // "string", "number", "boolean", "array", "object"
      title?: string,     // Display label for the field
      format?: string,    // Optional format like "date-time", "email", etc.
      minimum?: number,   // For number types
      maximum?: number,   // For number types
      minLength?: number, // For string types
      maxLength?: number, // For string types
      items?: object,     // For array types
      properties?: object, // For object types
      enum?: any[],       // For enumeration types
    },
    // More fields...
  },
  required: string[],     // Array of required field names
}
```

Example schema for a project form:

```typescript
const projectFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      title: {
        type: "string",
        minLength: 1,
        title: "Project Name",
      },
      company: {
        type: "string",
        minLength: 1,
        title: "Client Name",
      },
      description: {
        type: "string",
        minLength: 1,
        title: "Description",
      },
      startDate: {
        type: "string",
        format: "date-time",
        title: "Start Date",
      },
      endDate: {
        type: "string",
        format: "date-time",
        title: "End Date",
      },
      members: {
        type: "array",
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            value: { type: "string" },
          },
        },
        title: "Members",
      },
      budget: {
        type: "number",
        title: "Budget",
      },
    },
    required: ["title", "company", "description"],
  },
  // Field configuration (see next section)
  fieldConfig: {
    // ...
  }
}
```

## Field Configuration

The `fieldConfig` prop allows detailed customization of each field:

```typescript
{
  [fieldName]: {
    description?: string | React.ReactNode, // Help text below the field
    fieldType?: string,  // Override the default field type
    inputProps?: {       // Props passed to the input element
      placeholder?: string,
      disabled?: boolean,
      className?: string,
      defaultValue?: any,
      // Field-specific properties
      accept?: string,       // For file inputs
      options?: Array<{      // For select/radio/checkbox fields
        label: string,
        value: string
      }>,
      prefix?: string,       // For number inputs with prefix
      showLabel?: boolean,   // Control label visibility
      // ...other input properties
    },
    renderParent?: (props: { children: React.ReactNode }) => React.ReactElement
  }
}
```

Example field configuration:

```typescript
fieldConfig: {
  title: {
    description: "Project Name",
    inputProps: {
      placeholder: "App Development",
    },
  },
  company: {
    description: "Client Name",
    inputProps: {
      placeholder: "Dropbox, Inc.",
    },
  },
  description: {
    description: "Description",
    fieldType: "textarea", // Override default field type
    inputProps: {
      placeholder: "Create a mobile application on iOS and Android devices.",
      rows: 4,
    },
  },
  budget: {
    description: "Budget",
    fieldType: "number",
    inputProps: {
      placeholder: "25,000.00",
      prefix: "$",
      className: "pl-8",
    },
  },
}
```

## Field Types

AutoForm automatically maps schema types to appropriate input components:

| Data Type | Default Component | Description |
|-----------|-----------|-------------|
| String | `AutoFormInput` | Text input field |
| Number | `AutoFormNumber` | Numeric input with optional formatting |
| Boolean | `AutoFormCheckbox` | Checkbox input |
| Date | `AutoFormDate` | Date/time picker |
| Enum | `AutoFormEnum` | Dropdown select |
| Array | `AutoFormArray` | List of items with add/remove functionality |
| Object | `AutoFormObject` | Nested form fields |

You can override the default field type using the `fieldType` property:

```typescript
fieldConfig: {
  description: {
    fieldType: "textarea", // Override to use textarea instead of text input
  }
}
```

Available field types:
- `"checkbox"` - Checkbox input
- `"date"` - Date picker
- `"select"` - Dropdown select
- `"radio"` - Radio button group
- `"textarea"` - Multi-line text input
- `"number"` - Numeric input
- `"file"` - File upload input
- `"mcq"` - Multiple choice question
- `"multiCheckbox"` - Multiple checkbox selection
- `"multipleSelector"` - Multi-select dropdown

## Features

### Default Values & Form Editing

AutoForm supports pre-populating forms for editing existing data in multiple ways:

1. **Using the `values` prop** (Recommended for editing existing data):
   ```tsx
   // For editing an existing project
   const [formData, setFormData] = useState(existingProject);
   
   <AutoForm
     formSchema={projectFormSchema.formSchema}
     values={formData} // Pre-populate with existing data
     onSubmit={handleSubmit}
     // other props...
   />
   ```

2. **Using `defaultValue` in field configuration** (Good for static defaults):
   ```tsx
   fieldConfig: {
     status: {
       inputProps: {
         defaultValue: "active" // Default status for new records
       }
     }
   }
   ```

When handling form value changes, use the `onValuesChange` prop:

```tsx
const handleValuesChange = (values) => {
  setFormData(values); // Update local state with current form values
}

<AutoForm
  formSchema={formSchema}
  values={formData}
  onValuesChange={handleValuesChange}
  // other props...
/>
```

For edit forms, you typically want to:
1. Fetch the existing data
2. Transform data if needed (e.g., convert timestamps to Date objects)
3. Set it as the initial state
4. Pass it to AutoForm using the `values` prop

Example:

```tsx
function EditProjectForm({ projectId }) {
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    // Fetch project data
    fetchProject(projectId).then(data => {
      // Transform data if needed
      const formattedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      };
      setProject(formattedData);
    });
  }, [projectId]);
  
  return (
    <AutoForm
      formSchema={projectFormSchema.formSchema}
      fieldConfig={projectFormSchema.fieldConfig}
      values={project} // Pre-populate with existing data
      onSubmit={handleUpdateProject}
    >
      {/* Form buttons */}
    </AutoForm>
  );
}
```

### Disabling Fields

You can disable fields in multiple ways:

1. **Using `inputProps.disabled` in field configuration** (Static disabling):
   ```tsx
   fieldConfig: {
     id: {
       inputProps: {
         disabled: true // This field will always be disabled
       }
     }
   }
   ```

2. **Using a modified field config for editing** (Dynamic approach):
   ```tsx
   const getEditFieldConfig = (readOnlyFields = []) => {
     const config = structuredClone(baseFieldConfig);
     
     // Disable specified fields
     readOnlyFields.forEach(fieldName => {
       if (config[fieldName]) {
         config[fieldName].inputProps = {
           ...(config[fieldName].inputProps || {}),
           disabled: true
         };
       }
     });
     
     return config;
   };
   
   // Usage
   <AutoForm
     fieldConfig={getEditFieldConfig(['id', 'createdAt'])}
     // other props...
   />
   ```

3. **Using dependencies for conditional disabling**:
   ```tsx
   <AutoForm
     // other props...
     dependencies={{
       "paymentDetails": {
         field: "paymentMethod",
         type: "disabled",
         condition: {
           value: "cash" // Disable paymentDetails when paymentMethod is "cash"
         }
       }
     }}
   />
   ```

### Field Grouping

Group related fields with flexible layouts using the `fieldGroups` configuration:

```typescript
fieldConfig: {
  // Field definitions...
  
  fieldGroups: [
    {
      fields: ["startDate", "endDate"],
      layout: "row",
      gap: 4,
      className: "mb-4"
    },
    {
      fields: ["address", "city", "state", "zip"],
      layout: "grid",
      columns: 2,
      gap: 4
    }
  ]
}
```

Available layouts:
- `"row"` - Horizontal layout with flex-wrap
- `"column"` - Vertical stacked layout
- `"grid"` - CSS Grid layout with configurable columns

### Conditional Fields

Control field properties based on other field values using the `dependencies` prop:

```tsx
<AutoForm
  // other props...
  dependencies={{
    "cardNumber": {
      field: "paymentType",
      type: "disabled",
      condition: {
        value: "bank" // Disable cardNumber when paymentType is "bank"
      }
    },
    "cardDetails": {
      field: "paymentType",
      type: "hidden",
      condition: {
        value: "cash" // Hide cardDetails when paymentType is "cash"
      }
    },
    "shippingAddress": {
      field: "sameAsBilling",
      type: "disabled",
      condition: {
        value: true // Disable shippingAddress when sameAsBilling is true
      }
    }
  }}
/>
```

Supported dependency types:
- `"disabled"` - Disable a field based on another field's value
- `"hidden"` - Hide a field based on another field's value
- `"required"` - Make a field required based on another field's value
- `"setOptions"` - Change field options based on another field's value

### Custom Field Rendering

You can customize how fields are rendered:

1. **Override the field type**:
   ```typescript
   fieldConfig: {
     rating: {
       fieldType: "radio", // Use radio buttons instead of default input
       inputProps: {
         options: [
           { label: "Poor", value: "1" },
           { label: "Average", value: "2" },
           { label: "Good", value: "3" },
           { label: "Excellent", value: "4" }
         ],
         layout: "row"
       }
     }
   }
   ```

2. **Custom field component**:
   ```typescript
   import MyCustomField from "./MyCustomField";
   
   fieldConfig: {
     specialField: {
       fieldType: MyCustomField, // Use a custom component
       // other config...
     }
   }
   ```

3. **Custom parent wrapper**:
   ```typescript
   fieldConfig: {
     someField: {
       renderParent: ({ children }) => (
         <div className="custom-wrapper p-4 border rounded">
           {children}
         </div>
       )
     }
   }
   ```

### File Uploads

AutoForm supports file uploads with the `file` field type:

```typescript
fieldConfig: {
  files: {
    description: "Project Image",
    fieldType: "file",
    inputProps: {
      accept: "image/*",
      className: "w-full",
      showLabel: false,
    },
  },
}
```

The file data is available in the form submission data as a File object:

```typescript
const handleSubmit = (data) => {
  const fileData = data.files; // This is a File object
  
  // Use the file in your application
  const formData = new FormData();
  formData.append('file', fileData);
  
  // Upload the file
  fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
}
```

### Multi-select Fields

For multi-select capabilities, AutoForm provides two specialized field types:

1. **Multiple Selector Dropdown**:
   ```typescript
   fieldConfig: {
     members: {
       description: "Team Members",
       fieldType: "multipleSelector",
       inputProps: {
         defaultOptions: [
           { label: "John Doe", value: "john" },
           { label: "Jane Smith", value: "jane" },
           { label: "Bob Johnson", value: "bob" }
         ],
         placeholder: "Select members",
         defaultColor: "gray",
       },
     },
   }
   ```

2. **Multi-checkbox Selection**:
   ```typescript
   fieldConfig: {
     roles: {
       description: "User Roles",
       fieldType: "multiCheckbox",
       inputProps: {
         options: [
           { label: "Admin", value: "admin" },
           { label: "Editor", value: "editor" },
           { label: "Viewer", value: "viewer" }
         ],
         layout: "column"
       },
     },
   }
   ```

## Advanced Usage

### Form Event Handling

AutoForm provides several callback props for handling form events:

```tsx
<AutoForm
  formSchema={schema}
  values={initialData}
  onValuesChange={(values) => {
    // Called whenever any form value changes
    console.log("Current values:", values);
  }}
  onParsedValuesChange={(parsedValues) => {
    // Called with Zod-validated values when values change
    // Only triggered when validation passes
    console.log("Parsed values:", parsedValues);
  }}
  onSubmit={(values) => {
    // Called with validated data when form is submitted
    console.log("Form submitted with:", values);
  }}
>
  {/* Form content */}
</AutoForm>
```

### Nested Objects and Arrays

AutoForm can handle complex nested data structures:

```typescript
const formSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    address: {
      type: "object",
      properties: {
        street: {
          type: "string",
          title: "Street"
        },
        city: {
          type: "string",
          title: "City"
        }
      },
      required: ["street", "city"],
      title: "Address"
    },
    phones: {
      type: "array",
      items: {
        type: "string"
      },
      title: "Phone Numbers"
    }
  }
}
```

Nested objects will be rendered in an accordion, and arrays will have add/remove buttons.

## Examples

### Login Form

```tsx
const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      title: "Email"
    },
    password: {
      type: "string",
      title: "Password"
    },
    rememberMe: {
      type: "boolean",
      title: "Remember Me"
    }
  },
  required: ["email", "password"]
};

const loginFieldConfig = {
  email: {
    inputProps: {
      placeholder: "your.email@example.com",
      autoComplete: "email"
    }
  },
  password: {
    inputProps: {
      type: "password",
      placeholder: "••••••••",
      autoComplete: "current-password"
    }
  }
};

function LoginForm() {
  const handleSubmit = (data) => {
    // Handle login
    console.log("Login data:", data);
  };

  return (
    <AutoForm
      formSchema={loginSchema}
      fieldConfig={loginFieldConfig}
      onSubmit={handleSubmit}
    >
      <button type="submit">Log In</button>
    </AutoForm>
  );
}
```

### Edit Product Form

```tsx
function EditProductForm({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch product data
    setLoading(true);
    fetchProduct(productId).then(data => {
      // Transform data if needed
      const formattedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      };
      setProduct(formattedData);
    });
  }, [productId]);
  
  // Create field config with some disabled fields
  const fieldConfig = {
    id: {
      inputProps: {
        disabled: true
      }
    },
    sku: {
      inputProps: {
        disabled: true
      }
    },
    // Other fields...
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <AutoForm
      formSchema={productSchema}
      fieldConfig={fieldConfig}
      values={product} // Pre-populate form
      onSubmit={handleUpdateProduct}
    >
      <button type="submit">Update Product</button>
    </AutoForm>
  );
}
```

## API Reference

### AutoForm Component Props

| Prop | Type | Description |
|------|------|-------------|
| `formSchema` | `SchemaType \| JSONSchema` | The form schema (Zod schema or JSON schema) |
| `values` | `Partial<z.infer<SchemaType>>` | Initial form values |
| `onValuesChange` | `(values: Partial<z.infer<SchemaType>>) => void` | Called on form value changes |
| `onParsedValuesChange` | `(values: Partial<z.infer<SchemaType>>) => void` | Called on validated form value changes |
| `onSubmit` | `(values: z.infer<SchemaType>) => void` | Called on form submission |
| `fieldConfig` | `FieldConfig<z.infer<SchemaType>>` | Field configuration object |
| `children` | `React.ReactNode` | Form content (typically submit button) |
| `className` | `string` | Additional CSS classes for the form |
| `dependencies` | `Record<string, { field: string, type: string, condition: { value: any } }>` | Field dependencies configuration |

### Field Configuration Types

```typescript
type FieldConfigItem = {
  description?: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    showLabel?: boolean
    options?: MCQOption[]
    layout?: MCQLayoutType
    gridCols?: number
    optionSize?: MCQSizeType
    required?: boolean
    minRequired?: number
    icon?: LucideIcon
    iconName?: string
    defaultOptions?: MultipleSelectorOption[]
    defaultColor?: string
    multipleSelectorOptions?: MultipleSelectorOption[]
    columnSpan?: number
    rowSpan?: number
    fullWidth?: boolean
  }
  fieldType?: keyof typeof INPUT_COMPONENTS | React.FC<AutoFormInputComponentProps>
  renderParent?: (props: { children: React.ReactNode }) => React.ReactElement | null
}

type FieldConfig<SchemaType> = {
  [Key in keyof SchemaType]?: SchemaType[Key] extends object
    ? FieldConfig<z.infer<SchemaType[Key]>>
    : FieldConfigItem
} & {
  fieldGroups?: FieldGroupConfig[]
}

type FieldGroupConfig = {
  fields: string[]
  layout: "row" | "column" | "grid"
  columns?: number
  gap?: number
  className?: string
}
```

## Form Validation

By default, AutoForm uses the `"onSubmit"` validation mode instead of `"onChange"`. This means:

- Validation errors will only appear after the user attempts to submit the form
- Fields won't be validated as the user types
- This provides a better user experience for complex forms where immediate validation might be disruptive

If you need to change this behavior, you can modify the source code:

```tsx
// In AutoForm component:
const form = useForm<z.infer<typeof objectFormSchema>>({
  resolver: zodResolver(zodFormSchema),
  defaultValues: defaultValues ?? undefined,
  values: valuesProp,
  mode: "onSubmit", // Change this to "onChange" or "onBlur" if needed
})
```

### Error Handling and Display

AutoForm automatically displays validation errors using the Shadcn UI form components. Errors appear:

- Below each field that fails validation
- Only after form submission (with default `onSubmit` mode)
- Using the error messages defined in your Zod/JSON schema

Example of how errors look in the UI:

```tsx
<FormField>
  <FormLabel>Field Name</FormLabel>
  <FormControl>
    <Input {...field} />
  </FormControl>
  <FormMessage>
    {/* This displays the validation error message */}
    Error message appears here
  </FormMessage>
</FormField>
```

You can customize error styling by modifying the FormMessage component or applying custom CSS.

## Advanced Features

### Number Coercion

AutoForm automatically applies coercion to number fields, which means:

- String inputs are automatically converted to numbers
- Empty inputs are handled properly
- No need for manual conversion in your form handling code

This is implemented through the following code:

```tsx
// Inside AutoFormObject component
const handleIfZodNumber = (item: z.ZodAny) => {
  const isZodNumber = (item as any)._def.typeName === "ZodNumber"
  const isInnerZodNumber =
    (item._def as any).innerType?._def?.typeName === "ZodNumber"

  if (isZodNumber) {
    ;(item as any)._def.coerce = true
  } else if (isInnerZodNumber) {
    ;(item._def as any).innerType._def.coerce = true
  }
  return item
}
```

### Schema Conversion Details

When you provide a JSON schema to AutoForm, it's automatically converted to a Zod schema using the `json-schema-to-zod` library. The conversion process:

1. Parses your JSON schema
2. Generates an equivalent Zod schema as a string
3. Uses a Function constructor to evaluate this string into a Zod schema object
4. Uses this Zod schema with react-hook-form's resolver

Example of how this happens:

```tsx
function convertJsonSchemaToZod(schema: JSONSchema): z.ZodType {
  try {
    const zodString = jsonSchemaToZod(schema)
    const zodSchemaFunction = new Function("z", `return ${zodString}`)
    return zodSchemaFunction(z)
  } catch (error) {
    console.error("Error converting JSON schema to Zod:", error)
    throw new Error("Failed to convert JSON schema to Zod schema")
  }
}
```

This conversion allows you to use either JSON Schema or direct Zod schemas with the same component.

### Custom Input Components

You can create fully custom input components for AutoForm. These components need to follow a specific interface to integrate properly:

```tsx
// Custom input component example
const ColorPickerInput: React.FC<AutoFormInputComponentProps> = ({
  field, // From react-hook-form
  fieldProps,
  label,
  isRequired,
  zodInputProps,
  fieldConfigItem,
}) => {
  return (
    <FormItem>
      <FormLabel>
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <div className="flex flex-col gap-2">
          <input
            type="color"
            {...fieldProps}
            onChange={(e) => {
              field.onChange(e.target.value)
            }}
            className="h-10 w-full"
          />
          <div className="text-xs text-muted-foreground">
            Selected color: {field.value || "None"}
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

// Usage in field config
fieldConfig: {
  brandColor: {
    fieldType: ColorPickerInput, // Use the custom component
    description: "Select your brand color",
  }
}
```

When creating custom components, make sure to:
1. Use the FormItem/FormControl/FormMessage pattern for proper error handling
2. Properly wire up the field.onChange handler
3. Handle field.value for displaying the current value
4. Handle required fields and other field properties

### Dependencies Types

AutoForm supports sophisticated conditional logic through the `dependencies` prop. This allows you to:

- **Disable fields** based on other field values
- **Hide fields** based on other field values
- **Make fields required** based on other field values
- **Change field options** based on other field values

#### Making Fields Required Conditionally

```tsx
<AutoForm
  // other props...
  dependencies={{
    "cardCVC": {
      field: "paymentMethod",
      type: "required", // Make cardCVC required only when paymentMethod is "credit"
      condition: {
        value: "credit"
      }
    }
  }}
/>
```

#### Dynamically Changing Field Options

```tsx
<AutoForm
  // other props...
  dependencies={{
    "citySelect": {
      field: "stateSelect",
      type: "setOptions", // Change available cities based on selected state
      condition: {
        value: "california"
      },
      options: [
        { label: "Los Angeles", value: "la" },
        { label: "San Francisco", value: "sf" },
        { label: "San Diego", value: "sd" }
      ]
    }
  }}
/>
```

When the condition is not met (e.g., stateSelect is not "california"), the field will use its default options.

### Conditional Fields

Control field properties based on other field values using the `dependencies` prop:

```tsx
<AutoForm
  // other props...
  dependencies={{
    "cardNumber": {
      field: "paymentType",
      type: "disabled",
      condition: {
        value: "bank" // Disable cardNumber when paymentType is "bank"
      }
    },
    "cardDetails": {
      field: "paymentType",
      type: "hidden",
      condition: {
        value: "cash" // Hide cardDetails when paymentType is "cash"
      }
    },
    "shippingAddress": {
      field: "sameAsBilling",
      type: "disabled",
      condition: {
        value: true // Disable shippingAddress when sameAsBilling is true
      }
    }
  }}
/>
```

Supported dependency types:
- `"disabled"` - Disable a field based on another field's value
- `"hidden"` - Hide a field based on another field's value
- `"required"` - Make a field required based on another field's value
- `"setOptions"` - Change field options based on another field's value
