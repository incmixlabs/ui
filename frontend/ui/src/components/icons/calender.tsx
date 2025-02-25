export const CalendarIcon = (
  props: React.SVGProps<SVGSVGElement> & { size?: number }
) => (
  <svg
    width={props.size ?? 24}
    height={props.size ?? 24}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    {...props}
  >
    <title>Calender Icon</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.64935 2.75C6.64935 2.33579 6.31356 2 5.89935 2C5.48513 2 5.14935 2.33579 5.14935 2.75V3.25391H4.75C3.23122 3.25391 2 4.48512 2 6.00391V15.2539C2 16.7727 3.23122 18.0039 4.75 18.0039H9.09375C9.50796 18.0039 9.84375 17.6681 9.84375 17.2539C9.84375 16.8397 9.50796 16.5039 9.09375 16.5039H4.75C4.05964 16.5039 3.5 15.9443 3.5 15.2539V6.00391C3.5 5.31355 4.05964 4.75391 4.75 4.75391H5.14935V5.2514C5.14935 5.66561 5.48513 6.0014 5.89935 6.0014C6.31356 6.0014 6.64935 5.66561 6.64935 5.2514V4.75391H9.25V5.2514C9.25 5.66561 9.58579 6.0014 10 6.0014C10.4142 6.0014 10.75 5.66561 10.75 5.2514V4.75391H13.25V5.2514C13.25 5.66561 13.5858 6.0014 14 6.0014C14.4142 6.0014 14.75 5.66561 14.75 5.2514V4.75391H15.25C15.9404 4.75391 16.5 5.31355 16.5 6.00391V9.09766C16.5 9.51187 16.8358 9.84766 17.25 9.84766C17.6642 9.84766 18 9.51187 18 9.09766V6.00391C18 4.48512 16.7688 3.25391 15.25 3.25391H14.75V2.75C14.75 2.33579 14.4142 2 14 2C13.5858 2 13.25 2.33579 13.25 2.75V3.25391H10.75V2.75C10.75 2.33579 10.4142 2 10 2C9.58579 2 9.25 2.33579 9.25 2.75V3.25391H6.64935V2.75ZM5.92 9.2539C6.3066 9.2539 6.62 8.9405 6.62 8.5539C6.62 8.16731 6.3066 7.8539 5.92 7.8539C5.5334 7.8539 5.22 8.16731 5.22 8.5539C5.22 8.9405 5.5334 9.2539 5.92 9.2539ZM9.32 8.5539C9.32 8.9405 9.0066 9.2539 8.62 9.2539C8.2334 9.2539 7.92 8.9405 7.92 8.5539C7.92 8.16731 8.2334 7.8539 8.62 7.8539C9.0066 7.8539 9.32 8.16731 9.32 8.5539ZM5.92 11.9839C6.3066 11.9839 6.62 11.6705 6.62 11.2839C6.62 10.8973 6.3066 10.5839 5.92 10.5839C5.5334 10.5839 5.22 10.8973 5.22 11.2839C5.22 11.6705 5.5334 11.9839 5.92 11.9839ZM9.32 11.2839C9.32 11.6705 9.0066 11.9839 8.62 11.9839C8.2334 11.9839 7.92 11.6705 7.92 11.2839C7.92 10.8973 8.2334 10.5839 8.62 10.5839C9.0066 10.5839 9.32 10.8973 9.32 11.2839ZM5.92 14.6939C6.3066 14.6939 6.62 14.3805 6.62 13.9939C6.62 13.6073 6.3066 13.2939 5.92 13.2939C5.5334 13.2939 5.22 13.6073 5.22 13.9939C5.22 14.3805 5.5334 14.6939 5.92 14.6939ZM9.32 13.9939C9.32 14.3805 9.0066 14.6939 8.62 14.6939C8.2334 14.6939 7.92 14.3805 7.92 13.9939C7.92 13.6073 8.2334 13.2939 8.62 13.2939C9.0066 13.2939 9.32 13.6073 9.32 13.9939ZM11.35 9.2539C11.7366 9.2539 12.05 8.9405 12.05 8.5539C12.05 8.16731 11.7366 7.8539 11.35 7.8539C10.9634 7.8539 10.65 8.16731 10.65 8.5539C10.65 8.9405 10.9634 9.2539 11.35 9.2539ZM14.75 8.5539C14.75 8.9405 14.4366 9.2539 14.05 9.2539C13.6634 9.2539 13.35 8.9405 13.35 8.5539C13.35 8.16731 13.6634 7.8539 14.05 7.8539C14.4366 7.8539 14.75 8.16731 14.75 8.5539ZM14 16.5039C15.3807 16.5039 16.5 15.3846 16.5 14.0039C16.5 12.6232 15.3807 11.5039 14 11.5039C12.6193 11.5039 11.5 12.6232 11.5 14.0039C11.5 15.3846 12.6193 16.5039 14 16.5039ZM14 18.0039C16.2091 18.0039 18 16.213 18 14.0039C18 11.7948 16.2091 10.0039 14 10.0039C11.7909 10.0039 10 11.7948 10 14.0039C10 16.213 11.7909 18.0039 14 18.0039ZM13.7 12.5039C13.9761 12.5039 14.2 12.7278 14.2 13.0039V14.0039H14.9C15.1761 14.0039 15.4 14.2278 15.4 14.5039C15.4 14.78 15.1761 15.0039 14.9 15.0039H13.7C13.4239 15.0039 13.2 14.78 13.2 14.5039V13.0039C13.2 12.7278 13.4239 12.5039 13.7 12.5039Z"
    />
  </svg>
)
