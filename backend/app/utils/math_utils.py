"""
Chhote math helpers — risk engine mein use honge.
"""


def clamp(x, lo, hi):
    """
    Value ko lo aur hi ke beech mein rakho.
    
    Example:
        clamp(150, 0, 100) → 100
        clamp(-5, 0, 100) → 0
        clamp(45, 0, 100) → 45
    """
    if x < lo:
        return lo
    if x > hi:
        return hi
    return x


def z_score(value, mean, std):
    """
    Z-score = (value - mean) / std
    
    Batata hai: value mean se kitne std door hai.
    
    Example:
        value=104, mean=72, std=6
        z = (104-72)/6 = 5.33
    
    Matlab: value mean se 5.33 std upar hai — bahut zyada!
    
    Safety: agar std 0 ke kareeb hai toh 0 return karo.
    """
    if std < 1e-6:
        return 0.0
    return (value - mean) / std


def severity_from_z(z):
    """
    Z-score ko 0-100 severity mein convert karo.
    
    Rules:
        |z| < 1   → 0-30   (slightly off)
        |z| < 2   → 30-60  (moderate)
        |z| < 3   → 60-80  (high)
        |z| ≥ 3   → 80-100 (critical)
    """
    z = abs(z)
    if z < 1:
        return (z - 0) * 30        # 0 → 0, 1 → 30
    if z < 2:
        return 30 + (z - 1) * 30   # 1 → 30, 2 → 60
    if z < 3:
        return 60 + (z - 2) * 20   # 2 → 60, 3 → 80
    return clamp(80 + (z - 3) * 5, 80, 100)  # 3 → 80, 6 → 95


def percent_change(new_value, baseline):
    """
    Percentage change from baseline.
    
    Example:
        new=104, baseline=72
        change = (104-72)/72 * 100 = +44.4%
    """
    if abs(baseline) < 1e-6:
        return 0.0
    return (new_value - baseline) / baseline * 100