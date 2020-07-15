/**
 * @module dataTypes - the complete list of built-in types for XML schema docs
 * From https://www.w3.org/TR/xmlschema-2/#built-in-datatypes
 */

'use strict';

module.exports = {
    /**
     * Primitive datatypes
     */

    /**
     * The string datatype represents character strings in XML. The value 
     * space of string is the set of finite-length sequences of characters 
     * (as defined in [XML 1.0 (Second Edition)]) that ·match· the Char 
     * production from [XML 1.0 (Second Edition)]. A character is an atomic 
     * unit of communication; it is not further specified except to note that 
     * every character has a corresponding Universal Character Set code point, 
     * which is an integer.
     * 
     * Note:  Many human languages have writing systems that require child 
     * elements for control of aspects such as bidirectional formating or 
     * ruby annotation (see [Ruby] and Section 8.2.4 Overriding the 
     * bidirectional algorithm: the BDO element of [HTML 4.01]). 
     * Thus, string, as a simple type that can contain only characters but not 
     * child elements, is often not suitable for representing text. In such 
     * situations, a complex type that allows mixed content should be 
     * considered. For more information, see Section 5.5 Any Element, Any 
     * Attribute of [XML Schema Language: Part 0 Primer].
     * 
     * Note:  As noted in ordered, the fact that this specification does not 
     * specify an order-relation for string does not preclude other 
     * applications from treating strings as being ordered.
     */
    "string" : {
        "facets": [
            "length",
            "minLength",
            "maxLength",
            "pattern",
            "enumeration",
            "whiteSpace"
        ]
    },
    /**
     * boolean has the value space required to support the mathematical concept 
     * of binary-valued logic: {true, false, 1, 0}.
     */
    "boolean" : {
        "facets" : [
            "pattern",
            "whiteSpace"
        ],
        "legalLiterals" : [
            "0",
            "1",
            "true",
            "false",
        ]
    },
    /**
     * decimal represents a subset of the real numbers, which can be 
     * represented by decimal numerals. The value space of decimal is the set 
     * of numbers that can be obtained by multiplying an integer by a non-
     * positive power of ten, i.e., expressible as i × 10^-n where i and n are 
     * integers and n >= 0. Precision is not reflected in this value space; 
     * the number 2.0 is not distinct from the number 2.00. The order-relation 
     * on decimal is the order relation on real numbers, restricted to this 
     * subset.
     * 
     * Note:  All minimally conforming processors must support decimal numbers 
     * with a minimum of 18 decimal digits (i.e., with a totalDigits of 18). 
     * However, minimally conforming processors may set an application-defined 
     * limit on the maximum number of decimal digits they are prepared to 
     * support, in which case that application-defined maximum number must be 
     * clearly documented.
     * 
     * decimal has a lexical representation consisting of a finite-length 
     * sequence of decimal digits (#x30-#x39) separated by a period as a 
     * decimal indicator. An optional leading sign is allowed. If the sign is 
     * omitted, "+" is assumed. Leading and trailing zeroes are optional. If 
     * the fractional part is zero, the period and following zero(es) can be 
     * omitted. For example: -1.23, 12678967.543233, +100000.00, 210.
     * 
     * The canonical representation for decimal is defined by prohibiting 
     * certain options from the Lexical representation. Specifically, the 
     * preceding optional "+" sign is prohibited. The decimal point is 
     * required. Leading and trailing zeroes are prohibited subject to the 
     * following: there must be at least one digit to the right and to the left 
     * of the decimal point which may be a zero.
     */
    "decimal" : {
        "facets" : [
            "totalDigits",
            "fractionDigits",
            "pattern",
            "whiteSpace",
            "enumeration",
            "maxInclusive",
            "maxExclusive",
            "minInclusive",
            "minExclusive"
        ]
    },
    /**
     * float is patterned after the IEEE single-precision 32-bit floating point 
     * type [IEEE 754-1985]. The basic value space of float consists of the 
     * values m × 2^e, where m is an integer whose absolute value is less than 
     * 2^24, and e is an integer between -149 and 104, inclusive. In addition 
     * to the basic value space described above, the value space of float also 
     * contains the following three special values: positive and negative 
     * infinity and not-a-number (NaN). The order-relation on float is: x < y 
     * iff y - x is positive for x and y in the value space. Positive infinity 
     * is greater than all other non-NaN values. NaN equals itself but is 
     * incomparable with (neither greater than nor less than) any other value 
     * in the value space.
     * 
     * Note:  "Equality" in this Recommendation is defined to be "identity" 
     * (i.e., values that are identical in the ·value space· are equal and vice 
     * versa). Identity must be used for the few operations that are defined in 
     * this Recommendation. Applications using any of the datatypes defined in 
     * this Recommendation may use different definitions of equality for 
     * computational purposes; [IEEE 754-1985]-based computation systems are 
     * examples. Nothing in this Recommendation should be construed as 
     * requiring that such applications use identity as their equality 
     * relationship when computing.
     * 
     * Any value incomparable with the value used for the four bounding facets 
     * (minInclusive, maxInclusive, minExclusive, and maxExclusive) will be 
     * excluded from the resulting restricted value space. In particular, when 
     * "NaN" is used as a facet value for a bounding facet, since no other 
     * float values are comparable with it, the result is a value space either 
     * having NaN as its only member (the inclusive cases) or that is empty 
     * (the exclusive cases). If any other value is used for a bounding facet, 
     * NaN will be excluded from the resulting restricted value space; to add 
     * NaN back in requires union with the NaN-only space.
     * 
     * This datatype differs from that of [IEEE 754-1985] in that there is only 
     * one NaN and only one zero. This makes the equality and ordering of 
     * values in the data space differ from that of [IEEE 754-1985] only in 
     * that for schema purposes NaN = NaN.
     * 
     * A literal in the lexical space representing a decimal number d maps to 
     * the normalized value in the value space of float that is closest to d in 
     * the sense defined by [Clinger, WD (1990)]; if d is exactly halfway 
     * between two such values then the even value is chosen.
     * 
     * float values have a lexical representation consisting of a mantissa 
     * followed, optionally, by the character "E" or "e", followed by an 
     * exponent. The exponent must be an integer. The mantissa must be a 
     * decimal number. The representations for exponent and mantissa must 
     * follow the lexical rules for integer and decimal. If the "E" or "e" and 
     * the following exponent are omitted, an exponent value of 0 is assumed.
     * 
     * The special values positive and negative infinity and not-a-number have 
     * lexical representations INF, -INF and NaN, respectively. Lexical 
     * representations for zero may take a positive or negative sign.
     * 
     * For example, -1E4, 1267.43233E12, 12.78e-2, 12 , -0, 0 and INF are all 
     * legal literals for float.
     * 
     * The canonical representation for float is defined by prohibiting certain 
     * options from the Lexical representation. Specifically, the exponent must 
     * be indicated by "E". Leading zeroes and the preceding optional "+" sign 
     * are prohibited in the exponent. If the exponent is zero, it must be 
     * indicated by "E0". For the mantissa, the preceding optional "+" sign is 
     * prohibited and the decimal point is required. Leading and trailing 
     * zeroes are prohibited subject to the following: number representations 
     * must be normalized such that there is a single digit which is non-zero 
     * to the left of the decimal point and at least a single digit to the 
     * right of the decimal point unless the value being represented is zero. 
     * The canonical representation for zero is 0.0E0.
     */       
    "float" : {
        "facets" : [
            "pattern",
            "enumeration",
            "whiteSpace",
            "maxInclusive",
            "maxExclusive",
            "minInclusive",
            "minExclusive"
        ]
    },
    /**
     * The double datatype is patterned after the IEEE double-precision 64-bit 
     * floating point type [IEEE 754-1985]. The basic ·value space· of double 
     * consists of the values m × 2^e, where m is an integer whose absolute 
     * value is less than 2^53, and e is an integer between -1075 and 970, 
     * inclusive. In addition to the basicvalue space described above, the 
     * value space of double also contains the following three special values: 
     * positive and negative infinity and not-a-number (NaN). The order-
     * relation on double is: x < y iff y - x is positive for x and y in the 
     * value space. Positive infinity is greater than all other non-NaN values. 
     * NaN equals itself but is incomparable with (neither greater than nor 
     * less than) any other value in the value space.
     * 
     * Note:  "Equality" in this Recommendation is defined to be "identity" 
     * (i.e., values that are identical in the value space are equal and vice 
     * versa). Identity must be used for the few operations that are defined in 
     * this Recommendation. Applications using any of the datatypes defined in 
     * this Recommendation may use different definitions of equality for 
     * computational purposes; [IEEE 754-1985]-based computation systems are 
     * examples. Nothing in this Recommendation should be construed as 
     * requiring that such applications use identity as their equality 
     * relationship when computing. 
     * 
     * Any value incomparable with the value used for the four bounding facets 
     * (minInclusive, maxInclusive, minExclusive, and maxExclusive) will be 
     * excluded from the resulting restricted value space. In particular, when 
     * "NaN" is used as a facet value for a bounding facet, since no other 
     * double values are comparable with it, the result is a value space either 
     * having NaN as its only member (the inclusive cases) or that is empty 
     * (the exclusive cases). If any other value is used for a bounding facet, 
     * NaN will be excluded from the resulting restricted value space; to add 
     * NaN back in requires union with the NaN-only space.
     * 
     * This datatype differs from that of [IEEE 754-1985] in that there is only 
     * one NaN and only one zero. This makes the equality and ordering of 
     * values in the data space differ from that of [IEEE 754-1985] only in 
     * that for schema purposes NaN = NaN.
     * 
     * A literal in the lexical space representing a decimal number d maps to 
     * the normalized value in the value space of double that is closest to d; 
     * if d is exactly halfway between two such values then the even value is 
     * chosen. This is the best approximation of d ([Clinger, WD (1990)], [Gay, 
     * DM (1990)]), which is more accurate than the mapping required by 
     * [IEEE 754-1985].
     * 
     * double values have a lexical representation consisting of a mantissa 
     * followed, optionally, by the character "E" or "e", followed by an 
     * exponent. The exponent must be an integer. The mantissa must be a 
     * decimal number. The representations for exponent and mantissa must 
     * follow the lexical rules for integer and decimal. If the "E" or "e" and 
     * the following exponent are omitted, an exponent value of 0 is assumed.
     * 
     * The special values positive and negative infinity and not-a-number have 
     * lexical representations INF, -INF and NaN, respectively. Lexical 
     * representations for zero may take a positive or negative sign.
     * 
     * For example, -1E4, 1267.43233E12, 12.78e-2, 12 , -0, 0 and INF are all 
     * legal literals for double.
     * 
     * The canonical representation for double is defined by prohibiting 
     * certain options from the Lexical representation. Specifically, the 
     * exponent must be indicated by "E". Leading zeroes and the preceding 
     * optional "+" sign are prohibited in the exponent. If the exponent is 
     * zero, it must be indicated by "E0". For the mantissa, the preceding 
     * optional "+" sign is prohibited and the decimal point is required. 
     * Leading and trailing zeroes are prohibited subject to the following: 
     * number representations must be normalized such that there is a single 
     * digit which is non-zero to the left of the decimal point and at least a 
     * single digit to the right of the decimal point unless the value being 
     * represented is zero. The canonical representation for zero is 0.0E0.
     */
    "double" : {
        "facets" : [
            "pattern",
            "enumeration",
            "whiteSpace",
            "maxInclusive",
            "maxExclusive",
            "minInclusive",
            "minExclusive"
        ]
    },
    /**
     * duration represents a duration of time. The ·value space· of duration is
     * a six-dimensional space where the coordinates designate the Gregorian 
     * year, month, day, hour, minute, and second components defined in 
     * § 5.5.3.2 of [ISO 8601], respectively. These components are ordered in 
     * their significance by their order of appearance i.e. as year, month, 
     * day, hour, minute, and second.
     * 
     * Note:
     * All minimally conforming processors must support year values with a 
     * minimum of 4 digits (i.e., YYYY) and a minimum fractional second 
     * precision of milliseconds or three decimal digits (i.e. s.sss). However, 
     * minimally conforming processors may set an application-defined limit on 
     * the maximum number of digits they are prepared to support in these two 
     * cases, in which case that application-defined maximum number must be 
     * clearly documented.
     * 
     * The lexical representation for duration is the [ISO 8601] extended 
     * format PnYn MnDTnH nMnS, where nY represents the number of years, nM the 
     * number of months, nD the number of days, 'T' is the date/time 
     * separator, nH the number of hours, nM the number of minutes and nS the 
     * number of seconds. The number of seconds can include decimal digits to 
     * arbitrary precision.
     * 
     * The values of the Year, Month, Day, Hour and Minutes components are not 
     * restricted but allow an arbitrary unsigned integer, i.e., an integer 
     * that conforms to the pattern [0-9]+.. Similarly, the value of the 
     * Seconds component allows an arbitrary unsigned decimal. Following [ISO 
     * 8601], at least one digit must follow the decimal point if it appears. 
     * That is, the value of the Seconds component must conform to the pattern 
     * [0-9]+(\.[0-9]+)?. Thus, the lexical representation of duration does not 
     * follow the alternative format of § 5.5.3.2.1 of [ISO 8601].
     * 
     * An optional preceding minus sign ('-') is allowed, to indicate a 
     * negative duration. If the sign is omitted a positive duration is 
     * indicated. See also ISO 8601 Date and Time Formats (§D).
     * 
     * For example, to indicate a duration of 1 year, 2 months, 3 days, 10 
     * hours, and 30 minutes, one would write: P1Y2M3DT10H30M. One could also 
     * indicate a duration of minus 120 days as: -P120D.
     * 
     * Reduced precision and truncated representations of this format are 
     * allowed provided they conform to the following:
     * 
     * If the number of years, months, days, hours, minutes, or seconds in any 
     * expression equals zero, the number and its corresponding designator may 
     * be omitted. However, at least one number and its designator must be 
     * present.
     * 
     * The seconds part may have a decimal fraction.
     * 
     * The designator 'T' must be absent if and only if all of the time items 
     * are absent. The designator 'P' must always be present.
     * 
     * For example, P1347Y, P1347M and P1Y2MT2H are all allowed; P0Y1347M and 
     * P0Y1347M0D are allowed. P-1347M is not allowed although -P1347M is 
     * allowed. P1Y2MT is not allowed.
     * 
     * In general, the order-relation on duration is a partial order since 
     * there is no determinate relationship between certain durations such as 
     * one month (P1M) and 30 days (P30D). The ·order-relation· of two duration 
     * values x and y is x < y iff s+x < s+y for each qualified dateTime s in 
     * the list below. These values for s cause the greatest deviations in the 
     * addition of dateTimes and durations. Addition of durations to time 
     * instants is defined in Adding durations to dateTimes (§E).
     * 
     * 1696-09-01T00:00:00Z
     * 1697-02-01T00:00:00Z
     * 1903-03-01T00:00:00Z
     * 1903-07-01T00:00:00Z
     * 
     * The following table shows the strongest relationship that can be 
     * determined between example durations. The symbol <> means that the order 
     * relation is indeterminate. Note that because of leap-seconds, a seconds 
     * field can vary from 59 to 60. However, because of the way that addition 
     * is defined in Adding durations to dateTimes (§E), they are still totally 
     * ordered.
     * 
     * |---------------------------------------------------------------------|
     * |     |                         Relation                              |
     * |---------------------------------------------------------------------|
     * | P1Y |  > P36D  | <> P365D  |                   | <> P366D | < P367D |
     * |---------------------------------------------------------------------|
     * | P1M |  > P27D  |  <> P28D  | <> P29D | <> P30D | <> P31D  | < P32D  |
     * |---------------------------------------------------------------------|
     * | P5M |  > P149D |  <> P150D | <> P151D| <> P152D| <> P153D | < P154D |
     * |---------------------------------------------------------------------|
     * 
     * Implementations are free to optimize the computation of the ordering 
     * relationship. For example, the following table can be used to compare 
     * durations of a small number of months against days.
     * 
     * |----------------------------------------------------------------------|
     * |    | Months| 1| 2| 3|  4|  5|  6|  7|  8|  9| 10| 11| 12| 13| ...    |
     * |----------------------------------------------------------------------|
     * |Days|Minimum|28|59|89|120|150|181|212|242|273|303|334|365|393| ...    |
     * |----------------------------------------------------------------------|
     * |Days|Maximum|31|62|92|123|153|184|215|245|276|306|337|366|397| ...    |
     * |----------------------------------------------------------------------|
     * 
     * In comparing duration values with minInclusive, minExclusive, 
     * maxInclusive and maxExclusive facet values indeterminate comparisons 
     * should be considered as "false".
     * 
     * Certain derived datatypes of durations can be guaranteed have a total 
     * order. For this, they must have fields from only one row in the list 
     * below and the time zone must either be required or prohibited.
     * 
     * - year, month
     * - day, hour, minute, second
     * 
     * For example, a datatype could be defined to correspond to the [SQL] 
     * datatype Year-Month interval that required a four digit year field and a 
     * two digit month field but required all other fields to be unspecified. 
     * This datatype could be defined as below and would have a total order.
     * 
     * <simpleType name='SQL-Year-Month-Interval'>
     *     <restriction base='duration'>
     *         <pattern value='P\p{Nd}{4}Y\p{Nd}{2}M'/>
     *     </restriction>
     * </simpleType>

     */
    "duration" : {
        "facets" : [
            "pattern",
            "enumeration",
            "whiteSpace",
            "maxInclusive",
            "maxExclusive",
            "minInclusive",
            "minExclusive"
        ]
    },
    "dateTime" : {

    },
    "time" : {

    },
    "date" : {

    },
    "gYearMonth" : {

    },
    "gYear" : {

    },
    "gMonthDay" : {

    },
    "gDay" : {

    },
    "gMonth" : {

    },
    "hexBinary" : {

    },
    "base64Binary" : {

    },
    "anyURI" : {

    },
    "QName" : {

    },
    "NOTATION" : {

    },
    /**
     * Derived datatypes
     */
    "normalizedString" : {
        "parent" : "string"
    },
    "token" : {

    },
    "language" : {

    },
    "NMTOKEN" : {

    },
    "NMTOKENS" : {

    },
    "Name" : {

    },
    "NCName" : {

    },
    "ID" : {

    },
    "IDREF" : {

    },
    "IDREFS" : {

    },
    "ENTITY" : {

    },
    "ENTITIES" : {

    },
    "integer" : {

    },
    "nonPositiveInteger" : {

    },
    "negativeInteger" : {

    },
    "long" : {

    },
    "int" : {

    },
    "short" : {

    },
    "byte" : {

    },
    "nonNegativeInteger" : {

    },
    "unsignedLong" : {

    },
    "unsignedInt" : {
        
    },
    "unsignedShort" : {

    },
    "unsignedByte" : {

    },
    "positiveInteger" : {

    }
};