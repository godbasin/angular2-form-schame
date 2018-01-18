export const schameMap = {
    Simple: {
      config: {
        schameType: 'form',
        formConfig: [
          {
            type: "text",
            label: "Name",
            key: "name"
          },
          {
            type: "checkbox",
            label: "Job",
            key: "job",
            options: [
              {
                id: "doctor",
                text: "doctor",
                valid: true
              },
              {
                id: "engineer",
                text: "engineer",
                valid: true
              },
              {
                id: "teacher",
                text: "teacher",
                valid: true
              }
            ]
          }
        ]
      }
    },
    WithValidation: {
      config: {
        schameType: 'form',
        formConfig: [
        {
          validations: [
            {
              type: "required"
            },
            {
              type: "minLength",
              param: 2
            }
          ],
          type: "text",
          label: "Username",
          key: "username"
        },
        {
          validations: [
            {
              type: "email"
            }
          ],
          type: "text",
          label: "Email",
          key: "email"
        }
      ]
    }
    },
    AllFormComponents: {
      config: {
        schameType: 'form',
        formConfig: [
          {
            validations: [
              {
                type: "required",
                message: "required"
              }
            ],
            type: "text",
            label: "Name",
            key: "name"
          },
          {
            type: "select",
            label: "Area",
            key: "area",
            options: [
              {
                id: "North",
                text: "North"
              },
              {
                id: "South",
                text: "South"
              },
              {
                id: "Central",
                text: "Central"
              }
            ]
          },
          {
            type: "radio",
            label: "Gender",
            key: "gender",
            options: [
              {
                id: "male",
                text: "male"
              },
              {
                id: "female",
                text: "female"
              }
            ]
          },
          {
            type: "radio-with-input",
            label: "Job",
            key: "job",
            options: [
              {
                id: "teacher",
                text: "teacher"
              },
              {
                id: "doctor",
                text: "doctor"
              },
              {
                id: "others",
                text: "others",
                withInput: "1"
              }
            ]
          },
          {
            type: "checkbox",
            label: "Favorite Drinks",
            key: "favorite_drinks",
            options: [
              {
                id: "coffee",
                text: "coffee"
              },
              {
                id: "milk",
                text: "milk"
              },
              {
                id: "tea",
                text: "tea"
              }
            ]
          },
          {
            type: "checkbox-with-input",
            label: "Favorite Color",
            key: "favorite_color",
            options: [
              {
                id: "blue",
                text: "blue"
              },
              {
                id: "red",
                text: "red"
              },
              {
                id: "yellow",
                text: "yellow"
              },
              {
                id: "others",
                text: "others",
                withInput: "1"
              }
            ]
          },
          {
            type: "day",
            label: "Birthday",
            key: "birthday"
          },
          {
            type: "hour",
            label: "Date to hour",
            key: "date_to_hour"
          },
          {
            type: "minute",
            label: "Date to mimute",
            key: "date_to_min"
          },
          {
            limit: {
              width: "400",
              height: "400",
              size: "100",
              type: "png"
            },
            type: "upload-image",
            label: "Photo",
            key: "photo"
          }
        ]
      }
    },
    Array: {
      config: {
        schameType: 'array',
      functions: ["add", "delete", "edit"],
      formConfig: [
        {
          validations: [
            {
              type: "required",
              message: "required"
            }
          ],
          type: "text",
          label: "name",
          key: "Name"
        },
        {
          validations: [
            {
              type: "required",
              message: "required"
            }
          ],
          type: "number",
          label: "tel",
          key: "Tel"
        },
        {
          type: "day",
          label: "birthday",
          key: "birthday"
        }
      ]
    }
    },
    ArrayList: {
      config: {
      schameType: 'list',
      functions: ["add", "delete", "edit"],
      formConfig: [
        {
          validations: [
            {
              type: "required",
              message: "required"
            }
          ],
          type: "text",
          label: "name",
          key: "Name"
        },
        {
          validations: [
            {
              type: "required",
              message: "required"
            }
          ],
          type: "number",
          label: "tel",
          key: "Tel"
        },
        {
          type: "day",
          label: "birthday",
          key: "birthday"
        }
      ]
    }
    }
  };