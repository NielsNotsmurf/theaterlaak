using System.Net;
using System.Runtime.Serialization;

namespace theaterlaak.Exceptions;

[Serializable]
public abstract class DomainException : Exception
{
    protected DomainException()
    {
    }
    
    protected DomainException(string? message)
		: base(message)
	{
	}

	protected DomainException(string? message, Exception? innerException)
		: base(message, innerException)
	{
	}

	protected DomainException(SerializationInfo info, StreamingContext context)
		: base(info, context)
	{
	}

	public abstract HttpStatusCode StatusCode { get; }
}