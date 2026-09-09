import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import {
  Message,
  MessageContent,
  MessageGroup,
} from "@workspace/ui/components/message"

export function MessageMixedDirectionExample() {
  return (
    <MessageGroup className="w-full max-w-lg">
      <Message align="start">
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent className="flex flex-col gap-2">
              <p lang="fa" dir="rtl" className="text-start">
                <bdi dir="ltr" translate="no">
                  React
                </bdi>{" "}
                یک کتابخانه جاوااسکریپت بسیار محبوب است.
              </p>
              <p lang="en" dir="ltr" className="text-start">
                The label is «
                <bdi lang="fa" dir="rtl">
                  ذخیره
                </bdi>
                » in Persian.
              </p>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>
              {/* Physical left alignment is intentional, independent of dir. */}
              <p lang="fa" dir="rtl" className="text-left">
                این جمله فارسی عمداً از سمت چپ تراز شده است.
              </p>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="start">
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              <p lang="fa" dir="rtl" className="text-start">
                دستور{" "}
                <bdi dir="ltr">
                  <code translate="no">npm run build</code>
                </bdi>{" "}
                را اجرا کنید و{" "}
                <bdi dir="ltr" translate="no">
                  https://example.com/docs?q=rtl
                </bdi>{" "}
                را ببینید.
              </p>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>
              <p lang="en" dir="ltr" className="text-start">
                Everything is ready. Version 2.1 works.
              </p>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
