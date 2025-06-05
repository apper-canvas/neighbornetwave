export const Text = ({ type = 'p', children, className = '' }) => {
  const Tag = type
  return <Tag className={className}>{children}</Tag>
}