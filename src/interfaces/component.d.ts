export type FormGroup = CustomComponentsProps

export type FormSubmit = CustomComponentsProps & {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}