interface BadgeLabelProps {
  type: "CREATE" | "UPDATE" | "DELETE" | "PENDING" | "APPROVED" | "REJECTED";
  value: string;
}

function BadgeLabel(props: BadgeLabelProps) {
  if (props.type == "CREATE") {
    return (
      <span className="rounded-full px-2 py-1 text-xs font-medium bg-[#bfd7fe] text-[#1d64d8]">
        {props.value}
      </span>
    );
  } else if (props.type === "UPDATE") {
    return (
      <span className="rounded-full px-2 py-1 text-xs font-medium bg-[#c7c8fe] text-[#383bca]">
        {props.value}
      </span>
    );
  } else if (props.type === "DELETE") {
    return (
      <span className="rounded-full px-2 py-1 text-xs font-medium bg-[#d5d9e2] text-[#434e61]">
        {props.value}
      </span>
    );
  } else if (props.type === "PENDING") {
    return (
      <span className="rounded-full px-2 py-1 text-xs font-medium bg-[#fdd28a] text-[#b47409]">
        {props.value}
      </span>
    );
  } else if (props.type === "APPROVED") {
    return (
      <span className="rounded-full px-2 py-1 text-xs font-medium bg-[#a7f3da] text-[#047852]">
        {props.value}
      </span>
    );
  } else {
    return (
      <span className="rounded-full px-2 py-1 text-xs font-medium bg-[#fecaca] text-[#b91c1c]">
        {props.value}
      </span>
    );
  }
}

export default BadgeLabel;
