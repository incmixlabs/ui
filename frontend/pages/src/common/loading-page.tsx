import { Flex, Spinner } from "@incmix/ui"

const LoadingPage: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "16px",
      }}
    >
      <Flex direction="column" align="center" gap="4">
        <Spinner className="size-10" />
      </Flex>
    </Flex>
  )
}

export default LoadingPage
