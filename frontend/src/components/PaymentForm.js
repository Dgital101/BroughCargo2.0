import { Button, Form } from "react-bootstrap";

export default function PaymentForm({ amount }) {
  return (
    <Form
      action="https://www.payfast.co.za/eng/process"
      method="POST"
      className="mt-1"
    >
      <Form.Control type="hidden" name="merchant_id" value="22206578" />
      <Form.Control type="hidden" name="merchant_key" value="ogxbqwgnzukz1" />
      <Form.Control type="hidden" name="amount" value={amount} />
      <Form.Control type="hidden" name="item_name" value="Test Product" />
      <Button variant="primary" type="submit">
        Pay Now
      </Button>
    </Form>
  );
}
